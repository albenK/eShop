import { Observable } from "rxjs/Observable";
import { CategoryService } from "shared/services/category.service";
import { FilterEvent } from "../models/filter-event";
import { Component, OnInit,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  allCategories$:Observable<any[]>; //we use the async pipe in HTML file.
  userSelectedCategory:string = "all";//represents category user has selected. We use ngModel in HTML file.
  @Output() private categoryChange:EventEmitter<FilterEvent> = new EventEmitter<FilterEvent>();
  constructor(private categoryService:CategoryService) {
    this.allCategories$ = categoryService.getAllCategoriesFromDatabase();
  }

  ngOnInit() {
  }

  onCategoryChange() {
    const filterEvent:FilterEvent = {
      filterBy:"category",
      valueToFilterBy:this.userSelectedCategory
    };
    this.categoryChange.emit(filterEvent);
  }

}
