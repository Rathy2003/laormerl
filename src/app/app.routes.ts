import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { WatchMovieComponent } from './watch-movie/watch-movie.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
    {
        path:"",
        component:LayoutComponent,
        children:[
            {
                path:"",
                component:HomeComponent
            },
            {
                path:"category/:category",
                component:CategoryComponent
            },
            {
                path:"movie/:slug",
                component:WatchMovieComponent
            }
        ]
    }
];
