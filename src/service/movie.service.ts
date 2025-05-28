import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject} from "rxjs";
import { environment } from "../environments/environment";

export interface Movie{
    id: number
    name: string
    description?: string
    thumbnails?: string
    status: string
    slug:string,
    category_id: number
    created_at: Date
    updated_at: Date
}

@Injectable({providedIn:"root"})

export class MovieService{
    constructor(private http:HttpClient){
        this.fetchMovie()
    }
    private MovieSubject = new BehaviorSubject<Movie[]>([])
    movies$ = this.MovieSubject.asObservable()

    setMovie(movies:Movie[]){
        this.MovieSubject.next(movies)
    }

    fetchMovie(){
        this.http.get(`${environment.API_BASE_URL}/movies`).subscribe({
        next:(res) => {
            //@ts-ignore
            this.setMovie(res)
        },
        error:(err) => console.log(err)
        
        })
    }

    getMovie(){
        return this.movies$
    }

    clearMovie(){
        this.MovieSubject.next([])
    }
}