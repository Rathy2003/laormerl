import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Category, CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  category_list:Category[] = []
  constructor(private categoryService:CategoryService){}
  
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(cate => this.category_list = cate)
  }

}
