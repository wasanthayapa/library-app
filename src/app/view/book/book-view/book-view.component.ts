import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../../model/book';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.scss'
})
export class BookViewComponent implements OnInit {
  book!: Book
  @Input() bookId: number | null = null;

  constructor(
    private bookService: BookService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService

  ) { }
  ngOnInit(): void {
    if (this.bookId) {
      this.bookService.getBook(this.bookId).
        subscribe(data => {
          this.book = data;
        }, (error) => {
          this.toastr.error(error.error, 'Fail loading Book Details');
        }
        );
    }
  }
  closeModal(): void {
    this.activeModal.close()
  }
}
