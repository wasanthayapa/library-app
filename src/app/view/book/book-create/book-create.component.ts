import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../../service/book.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../../model/book';
import { Author } from '../../../model/author';
import { AuthorService } from '../../../service/author.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  authorList:Author[]=[]
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
    public activeModal: NgbActiveModal
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
        })
    }
  }

  getAllAuthorList(){
    this.authorService.getAuthors().subscribe(data => {
      this.authorList = data;
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
