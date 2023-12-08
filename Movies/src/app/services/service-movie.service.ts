import { Observable, of } from 'rxjs';
import { Movie } from './../models/movies';
import { Injectable } from '@angular/core';
import { moviesData } from './../Data/data';
@Injectable({
  providedIn: 'root'
})
export class ServiceMovieService {

  myFavoriteMovies: Movie[] = [];
  constructor() { }

  public getMovies(): Observable<Movie[]> {
    return of(moviesData);
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    return of(moviesData.find(movie => movie.id === id));
  }
}