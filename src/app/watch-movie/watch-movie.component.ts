import { Component, NgModule, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoJSComponent } from '../video-js/video-js.component';
import { OKRUComponent } from "../okru/okru.component";
import { Movie, MovieService } from '../../service/movie.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgClass } from '@angular/common';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // ES 2015

@Component({
  selector: 'app-watch-movie',
  imports: [VideoJSComponent, OKRUComponent,NgClass],
  templateUrl: './watch-movie.component.html',
  styleUrl: './watch-movie.component.css'
})
export class WatchMovieComponent implements OnInit{
  constructor(private route:ActivatedRoute,private http:HttpClient,private movieSevice:MovieService){}
  slug:string = ""
  movie_detail:Movie|any = null
  currentEpisode={
    id:null,
    url:null
  }
  related_movie_list:Movie[] = []
  posted_date?:string = ""
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || ""
    this.fetchMovieData();
    dayjs.extend(relativeTime)
  }

  fetchMovieData(){
    this.http.get(`${environment.API_BASE_URL}/movies/${this.slug}`).subscribe({
      next:(rp) =>{
         this.movie_detail = rp
         this.currentEpisode.id = this.movie_detail.episodes[0].id
         this.currentEpisode.url = this.movie_detail.episodes[0].url
         this.posted_date = dayjs(this.movie_detail.created_at).fromNow()
         this.fetchRelatedMovie()
      },
      error:(err) => console.log(err)
    })
  }

  fetchRelatedMovie(){
    this.movieSevice.getMovie().subscribe(movie=>{
      this.related_movie_list = movie.filter(item=> item.category_id === this.movie_detail.category_id && item.id !== this.movie_detail.id)
    })
    
  }

  onChangeEpisode(episode:any){
    this.currentEpisode = {...episode}
    console.log(this.currentEpisode);
  }

  getImage(path:string){
    return `${environment.IMAGE_BASE_URL}/${path}`
  }

}
