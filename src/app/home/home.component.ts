import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { Movie, MovieService } from '../../service/movie.service';
import { RouterLink } from '@angular/router';
import { Category, CategoryService } from '../../service/category.service';
import { NgClass } from '@angular/common';
import { SkeletonComponent } from "../skeleton/skeleton.component";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass, SkeletonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{ 

  constructor(private http:HttpClient,private movieService:MovieService,private categoryService:CategoryService){

  }

  api_url:string = "http://127.0.0.1:8000/api"
  movie_list:Movie[] = []
  latest_movie:Movie[] = []
  category_list:Category[] = []
  is_loading:boolean = true

  ngOnInit(): void {
    this.movieService.movies$.subscribe( movie => {
      if(movie.length > 0){
        this.movie_list = movie
        this.latest_movie = movie.slice(0,12)
        this.is_loading = false
      }

    })

    this.categoryService.category$.subscribe(category => {
      this.category_list = category
    })
    this.getMovie()
  }

  getMovieByCategoryId(cat_id:number){
    return this.movie_list.filter(item => item.category_id === cat_id).slice(0,12)
  }

  getMovie(){
    this.http.get(`${this.api_url}/movies`).subscribe({
      next:(res) => {
        //@ts-ignore
        this.movieService.setMovie(res)
      },
      error:(err) => console.log(err)
      
    })
  }

    getImage(path:string){
      return `${environment.IMAGE_BASE_URL}/${path}`
    }

  generateSkeleton(){
    return Array.from(Array(12).keys())
  }
}
