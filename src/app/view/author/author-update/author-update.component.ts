import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from '../../../model/author';
import { AuthorService } from '../../../service/author.service';
import { AuthorListComponent } from '../author-list/author-list.component';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.scss'
})
export class AuthorUpdateComponent {
  @Input() authorId: number | null = null;

  authorUpdateForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.authorId) {
      this.authorService.getAuthor(this.authorId).subscribe(data => {
        this.authorUpdateForm.patchValue(data);
      });
    }
  }

  updateAuthor(): void {
    if (this.authorUpdateForm.valid) {
      const author: Author = this.authorUpdateForm.value;
      if (this.authorId) {
        this.authorService.updateAuthor(this.authorId, author).subscribe(() => {
          this.reloadAuthorList();
          this.closeModal();
        });
      }
    }
  }
  closeModal(): void {
    this.activeModal.close()
  }

  reloadAuthorList() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/author']);
    });
  }
}
