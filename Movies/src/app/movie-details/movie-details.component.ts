import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceMovieService } from '../services/service-movie.service';
import { Movie } from '../models/movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  moviesToShow: Movie[] = [];
  movie: string = '';
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private serviceMovie: ServiceMovieService
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
        this.moviesToShow = [movie]; // Colocar el objeto Movie en un array
        // ... hacer algo más con movie ...
      } else {
        console.log('Película no encontrada');
        this.moviesToShow = []; // Asignar un array vacío o manejar de acuerdo a tu lógica
      }
    });
  }

  getMoviesByIdSelected(movieById: number): void {
    /*  this.moviesToShow = this.moviesToShow.find((item: Movie) => item.id === movieById);
     console.log(foundItem ? `Objeto encontrado: ${foundItem}` : "Objeto no encontrado");
     console.log(foundItem); */

    /* 
        var movieFounded = this.moviesToShow.filter(function (movie) {
          return movie.id === movieById;
        }, null);
     */
    /* const resultado = this.moviesToShow.find((movie) => movie.id === 1); */
    /* const movieFounded: Movie | null = this.moviesToShow.reduce((value: Movie | null, movie: Movie) => {
      return movie.id === movieById ? movie : value;
    }, null); */

    /*  console.log(foundItem); */
    /*  this.moviesToShow = resultado; */





    /*  this.serviceMovie.getMovies().subscribe(movieById => {
       this.moviesToShow = movieById;
       console.log('entró:', this.moviesToShow);
 
       const itemIdToFind: number = 2;
       const foundItem: Movie | undefined = movieById.find((item: Movie) => item.id === movieById);
       console.log(foundItem ? `Objeto encontrado: ${foundItem}` : "Objeto no encontrado");
 
     }); */
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
