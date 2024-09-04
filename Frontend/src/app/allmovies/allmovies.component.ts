import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Emitters } from '../Emitters/Emitter';

@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.css']
})
export class AllmoviesComponent {

  movieList : any[] = [
    {
      movieImg: "assets/Recommend/RM1.avif",
      movieName:'Sam Bahadur',
      language:'Hindi',
      ticketRate:'250',
      shows:['9:00AM - 12:30PM' , '3:30PM - 6:30PM','7:00PM - 10:00PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'5'},
        {row:'C', noOfSeats:'7'},
        {row:'D', noOfSeats:'6'},
        {row:'E', noOfSeats:'5'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM2.avif',
      movieName:'Tiger 3',
      language:'Hindi',
      ticketRate:'300',
      shows:['9:00AM - 12:30PM' , '3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'5'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM3.avif',
      movieName:'Napoleon',
      language:'English',
      ticketRate:'200',
      shows:['3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM4.avif',
      movieName:'Wish',
      language:'English',
      ticketRate:'250',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM5.avif',
      movieName:'12th Fail',
      language:'Hindi',
      ticketRate:'180',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM','7:30PM - 10:00PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'3'},
        {row:'C', noOfSeats:'6'},
        {row:'D', noOfSeats:'4'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM6.avif',
      movieName:'Anari is Back',
      language:'Hindi',
      ticketRate:'350',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM','7:30PM - 10:30PM','10:30PM-12:00AM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'7'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'6'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM7.avif',
      movieName:'Star Fish',
      language:'English',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM8.avif',
      movieName:'Parinda',
      language:'Hindi',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM9.avif',
      movieName:'Pathan',
      language:'Hindi',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM10.avif',
      movieName:'Yaatris',
      language:'English',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM11.avif',
      movieName:'Migration',
      language:'English',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM12.avif',
      movieName:'Dawshom Awbotaar',
      language:'Bengali',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM13.avif',
      movieName:'Kurban',
      language:'Bengali',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM14.avif',
      movieName:'Raktabeej',
      language:'Bengali',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM15.avif',
      movieName:'Kabuliwala',
      language:'Bengali',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    },
    {
      movieImg: 'assets/Recommend/RM16.avif',
      movieName:'Pradhan',
      language:'Bengali',
      ticketRate:'200',
      shows:['9:00AM - 12:30PM' , '1:00PM - 3:00PM','3:30PM - 6:30PM','7:00PM - 10:00PM'],
      seatRows:[
        {row:'A', noOfSeats:'8'},
        {row:'B', noOfSeats:'8'},
        {row:'C', noOfSeats:'8'},
        {row:'D', noOfSeats:'8'},
        {row:'E', noOfSeats:'8'},
      ]
    }
  ]

  constructor(private router: Router, private userService: UserService ){}
  
  selectedMovie: any;

  onSelectMovie(movieData:any){
    this.userService.setDetails(movieData);
    this.selectedMovie = movieData;
  }

  searchMovie: any;
  filteredMoviesList: any[] = [];
  searchList = false;


  onSearch(): void{
    // if(this.searchName){
    //   this.filteredMoviesList = this.movieList.filter(movie => movie.movieName.toLowerCase().includes(this.searchName.toLowerCase()));
    //   this.authenticated = true;
    // }
    // else if(this.searchLanguage){
    //   this.filteredMoviesList = this.movieList.filter(movie => movie.language.toLowerCase().includes(this.searchLanguage.toLowerCase()));
    //   this.authenticated = true; 
    // }
    this.filteredMoviesList = this.movieList.filter(movie => {
      const searchTerm = this.searchMovie ? this.searchMovie.toLowerCase() : '';
      const searchLang = this.searchMovie ? this.searchMovie.toLowerCase() : '';
      const movieName = movie.movieName.toLowerCase();
      const movieLang = movie.language.toLowerCase();

      return (
        (searchTerm && movieName.includes(searchTerm)) ||
        (searchLang && movieLang.includes(searchLang))
      );
    });
    this.searchList = true;
  }
}
