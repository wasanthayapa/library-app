import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../../model/author';
import { Router } from '@angular/router';
import { AuthorService } from '../../../service/author.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.scss'
})
export class AuthorCreateComponent implements OnInit {
  authorCreateForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  createAuthor(): void {
    if (this.authorCreateForm.valid) {
      const author: Author = this.authorCreateForm.value;
      this.authorService.createAuthor(author).
        subscribe({
          next: () => {
            this.reloadAuthorList();
            this.closeModal();
            this.toastr.success("", 'Author creation sucessfull');
          },
          error: (error) => {
            this.toastr.error(error.error, 'Author creation fail');
          }
        })
    } else {
      this.toastr.error("", 'Please fill required fields');
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


