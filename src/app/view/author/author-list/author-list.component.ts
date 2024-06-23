import { Component, OnInit, TemplateRef } from '@angular/core';
import { Author } from '../../../model/author';
import { AuthorService } from '../../../service/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorCreateComponent } from '../author-create/author-create.component';
import { AuthorUpdateComponent } from '../author-update/author-update.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent implements OnInit{
  authors: Author[] = [];
  page = 0;
  size = 3;
  totalItems = 0;
  totalPages = 0;
  first = false;
  last = true;
  pageSizes = [2, 3, 4, 5];

  constructor(
    private authorService: AuthorService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAuthor()
  }

  addAuthor() {
    this.modalService.open(AuthorCreateComponent);
  }

  editAuthor(authorId: number) {
    const modalRef = this.modalService.open(AuthorUpdateComponent);
    modalRef.componentInstance.authorId = authorId;
  }

  loadAuthor() {
    this.authorService.getPaginatedData(this.page, this.size).
      subscribe({
        next: (data) => {
          this.authors = data.content;
          this.totalItems = data.totalElements
          this.totalPages = data.totalPages
          this.first = data.first
          this.last = data.last
        },
        error: (error) => {
          this.toastr.error(error.error, 'Authors loading fail');
        }
      })
  }
  onPageChange(page: number): void {
    this.page = page - 1;
    this.loadAuthor();
  }

  onSizeChange(size: number): void {
    this.size = size;
    this.page = 0;
    this.loadAuthor();
  }
}
