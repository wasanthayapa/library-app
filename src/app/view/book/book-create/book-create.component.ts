import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../../service/book.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../../model/book';
import { Author } from '../../../model/author';
import { AuthorService } from '../../../service/author.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  authorList: Author[] = []
  bookCreateForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    isbn: ['', Validators.required],
    authorId: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllAuthorList();
  }

  createBook(): void {
    if (this.bookCreateForm.valid) {
      const book: Book = this.bookCreateForm.value;
      this.bookService.createBook(book).
        subscribe(() => {
          this.reloadBookList();
          this.closeModal();
          this.toastr.success('Book sucessfully registered');
        },
          (error) => {
            this.toastr.error(error.error, 'Book registration fail');
          }
        )
    } else {
      this.toastr.error("", 'Please fill required fields');
    }
  }
  getAllAuthorList() {
    this.authorService.getAuthors().
      subscribe(data => {
        this.authorList = data;
      },
        (error) => {
          this.toastr.error(error.error, 'Fail author loading');
        }
      )
  }

  closeModal(): void {
    this.activeModal.close()
  }

  reloadBookList() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/book']);
    });
  }
}
