import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorListComponent } from './view/author/author-list/author-list.component';
import { BookListComponent } from './view/book/book-list/book-list.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthorCreateComponent } from './view/author/author-create/author-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BookViewComponent } from './view/book/book-view/book-view.component';
import { BookCreateComponent } from './view/book/book-create/book-create.component';
import { BookUpdateComponent } from './view/book/book-update/book-update.component';
import { AuthorUpdateComponent } from './view/author/author-update/author-update.component';
import { HeaderComponent } from './template/header/header/header.component';
import { FooterComponent } from './template/footer/footer/footer.component';
import { SiberBarComponent } from './template/sider-bar/siber-bar/siber-bar.component';
import { PaginationComponent } from './template/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    BookListComponent,
    AuthorCreateComponent,
    BookViewComponent,
    BookCreateComponent,
    BookUpdateComponent,
    AuthorUpdateComponent,
    HeaderComponent,
    FooterComponent,
    SiberBarComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
