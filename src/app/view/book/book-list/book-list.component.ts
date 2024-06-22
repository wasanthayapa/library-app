import { Component } from '@angular/core';
import { Book } from '../../../model/book';
import { BookService } from '../../../service/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorCreateComponent } from '../../author/author-create/author-create.component';
import { BookViewComponent } from '../book-view/book-view.component';
import { BookUpdateComponent } from '../book-update/book-update.component';
import { BookCreateComponent } from '../book-create/book-create.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books!: Book[];

  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }
  viewBook(bookId:number){
    const modalRef=this.modalService.open(BookViewComponent);
    modalRef.componentInstance.bookId = bookId;
  }

  createBook(){
   this.modalService.open(BookCreateComponent);
  }

  updateBook(bookId:number){
    const modalRef=this.modalService.open(BookUpdateComponent);
    modalRef.componentInstance.bookId = bookId;
  }
}