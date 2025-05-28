import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { environment } from "../environments/environment"

export interface Category{
    id:number
    name:string
    description:string,
    slug:string,
    movies:any,
    created_at:Date,
    updated_at:Date
}

@Injectable({
    providedIn:'root'
})

export class CategoryService{
    constructor(private http:HttpClient){
        this.fetchCategory()
    }
    private CategorySubject = new BehaviorSubject<Category[]>([]);
    category$ = this.CategorySubject.asObservable()

    setCategory(category:Category[]){
        this.CategorySubject.next(category)
    }

   fetchCategory(){
     this.http.get(`${environment.API_BASE_URL}/categories`).subscribe({
      next:(res) => {
        //@ts-ignore
        this.setCategory(res)
      },
      error:(err) => console.log(err)
    })
   }

   getCategory(){
    return this.category$
   }

    clearCategory(){
        this.CategorySubject.next([])
    }
}