import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from '../../../model/author';
import { Book } from '../../../model/book';
import { AuthorService } from '../../../service/author.service';
import { BookService } from '../../../service/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.scss'
})
export class BookUpdateComponent {
  authorList: Author[] = []
  @Input() bookId: number | null = null;

  bookUpdateForm: FormGroup = this.fb.group({
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
    if (this.bookId) {
      this.bookService.getBook(this.bookId).
        subscribe({
          next: (data) => {
            this.bookUpdateForm.patchValue(data);
          },
          error: (error) => {
            this.toastr.error(error.error, 'Fail book loading');
          }
        })
    }
  }

  updateBook(): void {
    if (this.bookUpdateForm.valid) {
      if (this.bookId) {
        const book: Book = this.bookUpdateForm.value;
        this.bookService.updateBook(this.bookId, book).
          subscribe({
            next: () => {
              this.reloadBookList();
              this.closeModal();
              this.toastr.success('Book sucessfully updated');
            },
            error: (error) => {
              this.toastr.error(error.error, 'Book update fail');
            }
          })
      }
    } else {
      this.toastr.error("", 'Please fill required fields');
    }
  }

  getAllAuthorList() {
    this.authorService.getAuthors().
      subscribe({
        next: (data) => {
          this.authorList = data;
        },
        error: (error) => {
          this.toastr.error(error.error, 'Fail author loading');
        }
      })
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
