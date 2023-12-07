import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceMovieService } from '../services/service-movie.service';
import { Movie } from '../models/movies';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  moviesToShow: Movie[] = [];
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private serviceMovie: ServiceMovieService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getServiceResponse();
  }
  getServiceResponse() {
    this.activeRoute.params.subscribe((val) => {
      const movieId: number = +val['id'];
      if (!isNaN(movieId)) {
        this.getMovieById(movieId);
      } else {
        console.error('Identificador de película no válido');
      }
    });
  }
  getMovieById(movieById: number): void {
    this.serviceMovie.getMovieById(movieById).subscribe((movie: Movie | undefined) => {
      if (movie) {
        // Si la película fue encontrada, ahora puedes usarla
        console.log('Película encontrada:', movie);
        this.moviesToShow = [movie];
      } else {
        console.log('Película no encontrada');
        this.moviesToShow = [];
      }
    });
  }
  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
