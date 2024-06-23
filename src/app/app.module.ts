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
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { SiberBarComponent } from './template/siber-bar/siber-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
