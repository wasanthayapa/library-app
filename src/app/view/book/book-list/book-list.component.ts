import { Component } from '@angular/core';
import { Book } from '../../../model/book';
import { BookService } from '../../../service/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorCreateComponent } from '../../author/author-create/author-create.component';
import { BookViewComponent } from '../book-view/book-view.component';
import { BookUpdateComponent } from '../book-update/book-update.component';
import { BookCreateComponent } from '../book-create/book-create.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books!: Book[];
  page = 0;
  size = 3;
  totalItems = 0;
  totalPages = 0;
  first = false;
  last = true;
  pageSizes = [2, 3, 4, 5];

  constructor(
    private bookService: BookService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBook();
  }
  viewBook(bookId: number) {
    const modalRef = this.modalService.open(BookViewComponent);
    modalRef.componentInstance.bookId = bookId;
  }

  createBook() {
    this.modalService.open(BookCreateComponent);
  }

  updateBook(bookId: number) {
    const modalRef = this.modalService.open(BookUpdateComponent);
    modalRef.componentInstance.bookId = bookId;
  }

  loadBook() {
    this.bookService.getPaginationBooks(this.page, this.size).
      subscribe(data => {
        this.books = data.content;
        this.totalItems = data.totalElements
        this.totalPages = data.totalPages
        this.first = data.first
        this.last = data.last
      }, (error) => {
        this.toastr.error(error.error, 'Fail books loading');
      }
      );
  }
  onPageChange(page: number): void {
    this.page = page - 1;
    this.loadBook();
  }

  onSizeChange(size: number): void {
    this.size = size;
    this.page = 0;
    this.loadBook();
  }
}