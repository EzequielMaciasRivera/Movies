
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movies';
import { Router } from '@angular/router';
import { ServiceMovieService } from '../services/service-movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  moviesToShow: Movie[] = [];
  choosedMovie: any;
  sortedByAlphabetic = false;
  sortedByRealisedDate = false;
  constructor(
    private readonly router: Router,
    private serviceMovie: ServiceMovieService
  ) { }

  ngOnInit(): void {
    this.getMovies();

  }
  getMovies(): void {
    this.serviceMovie.getMovies().subscribe(movies => {
      this.moviesToShow = movies;
    });
  }
  sortByAlphabetic(movies: Movie[]): Movie[] {
    this.moviesToShow = movies.sort((a, b) =>
      this.sortedByAlphabetic ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
    this.sortedByAlphabetic = !this.sortedByAlphabetic;
    return this.moviesToShow;
  }
  sortConvertStringDateToString(movies: Movie[]): Movie[] {
    const sortOrder = this.sortedByRealisedDate ? -1 : 1;
    const sortedArray = movies.sort((a, b) => sortOrder * (new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime()));
    this.moviesToShow = sortedArray.map((obj) => ({
      ...obj,
      releasedDate: new Date(obj.releasedDate).toISOString(),
    }));
    this.sortedByRealisedDate = !this.sortedByRealisedDate;
    return this.moviesToShow;
  }

  seeDetails(id: number | undefined) {
    this.router.navigate([`/movieDetails/${id}`]);
  }






  whatchMovie(heroe: any): void {
    this.choosedMovie = heroe;
    console.log(this.choosedMovie);
  }
}
