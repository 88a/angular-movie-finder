import {Component, OnInit} from '@angular/core';
import {Cast, MovieDetails, MoviesService} from '../service/movies.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  defaultUrl = 'https://www.youtube.com/embed/';
  video: string;
  movieDetails: MovieDetails;
  stars: string[] = Array();
  casts: Cast[];
  isLoading: boolean;

  constructor(private moviesServices: MoviesService, private router: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.router.params.subscribe((params) => {
        this.isLoading = true;
        console.log(this.isLoading + ' load after init');
        const param = 'id';
        const id = params[param];
        this.moviesServices.getMovie(id).subscribe(movie => {
          this.movieDetails = movie;
          this.video = this.defaultUrl + this.movieDetails.videos.results[0].key;
          this.stars = [];
          this.moviesServices.fillStarArr(movie.vote_average, this.stars);
        });
        this.moviesServices.getMovieCast(id).subscribe(cast => {
          this.casts = cast;
        });

      }
    );
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogBodyComponent, {
  //     data: {
  //       poster: this.movieDetails.poster_path
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.isLoading = false;
  //   console.log(this.isLoading + ' load after init');
  // }

  // ngDoCheck(): void {
  //   this.isLoading = false;
  //   console.log(this.isLoading + ' load do check');
  // }

  showMovie() {
    // if ()
    this.isLoading = false;
    console.log(this.isLoading + ' show movie');
  }
}
