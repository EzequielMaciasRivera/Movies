import { moviesData } from './../Data/data';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  moviesToShow: Movie[] = [];
  choosedMovie: any;
  constructor() { }

  ngOnInit(): void {
    this.moviesToShow = moviesData;
  }
  whatchMovie(heroe: any): void {
    this.choosedMovie = heroe;
    console.log(this.choosedMovie);
  }
}
