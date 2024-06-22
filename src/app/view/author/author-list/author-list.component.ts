import { Component, TemplateRef } from '@angular/core';
import { Author } from '../../../model/author';
import { AuthorService } from '../../../service/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorCreateComponent } from '../author-create/author-create.component';
import { AuthorUpdateComponent } from '../author-update/author-update.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  authors: Author[] = [];

  constructor(
    private authorService: AuthorService,
    private modalService: NgbModal
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
    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }
}
