import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorListComponent } from './view/author/author-list/author-list.component';
import { BookListComponent } from './view/book/book-list/book-list.component';

export const routes: Routes = [
    { path: 'author', component: AuthorListComponent },
    { path: 'book', component: BookListComponent },
    { path: '', redirectTo: '/book', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }