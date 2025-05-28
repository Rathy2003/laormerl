import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Movie, MovieService } from '../../service/movie.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { NgClass } from '@angular/common';
import { environment } from '../../environments/environment';



interface Category{
  id:number
  name:string
  description:string,
}

@Component({
  selector: 'app-category',
  imports: [RouterModule,NgClass],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  constructor(private movieService:MovieService,private categoryService:CategoryService,private route:ActivatedRoute){
  }

  selected_category:Category|null = null
  movie_list:Movie[] = []
  page:number = 1
  result_per_page=24
  totalPage:number = 0

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = 1
      this.categoryService.getCategory().subscribe(cat=> cat.forEach(item => {
        if(item.slug === params.get("category")){
          this.selected_category = item
        }
      }))

      this.movieService.getMovie().subscribe(movie=> {
        if(params.get("category") === "latest-post"){
            this.movie_list = movie
            this.selected_category = {name:"Latest Post",id:0,description:""};
        }else{
          this.movie_list = movie.filter(item => item.category_id===this.selected_category?.id)
        }
        
        this.totalPage = Math.ceil(this.movie_list.length / this.result_per_page)
      })
    })

  }

  getPage(page:number){
    this.page = page
    let startPage = (page - 1) * this.result_per_page
    let endPage = startPage + this.result_per_page
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // or 'auto'
    });
    return this.movie_list.slice(startPage,endPage)
  }

  getTotalPaginate(){
    return Array.from(Array(this.totalPage).keys())
  }

  getImage(path:string){
    return `${environment.IMAGE_BASE_URL}/${path}`
  }

}
