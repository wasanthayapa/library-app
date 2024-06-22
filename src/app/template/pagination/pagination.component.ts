import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input()page = 1;
  @Input()size = 3;
  @Input()totalItems = 0;
  @Input()totalPages = 0;
  @Input()first=false;
  @Input()last=true;
  pageSizes = [2, 3, 4, 5];
  constructor() {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    this.page = page-1;
   // this.loadAuthor();
  }

  onSizeChange(size: number): void {
    this.size = size;
    this.page = 0;
    //this.loadAuthor();
  }
  }
