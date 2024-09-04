import { Component} from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../Emitters/Emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  imageBanner: String[] =[
    'assets/banner1.avif',
    'assets/banner2.avif',
    'assets/banner3.avif',
    'assets/banner4.avif',
    'assets/banner5.avif'
  ];

  reMoviesList: any[] =[
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
  ];

  preMoviesList: any[] =[
    {
      movieImg:"assets/Premiume/PRE1.avif",
      movieName:"Shrimoti Bhoyonkori",
      language:"Bengali",
    },
    {
      movieImg:"assets/Premiume/PRE2.avif",
      movieName:"Swathi muttina Male Haniye",
      language:"Kannada",
    },
    {
      movieImg:"assets/Premiume/PRE3.avif",
      movieName:"Enjoy",
      language:"Tamil",
    },
    {
      movieImg:"assets/Premiume/PRE4.avif",
      movieName:"Warhorse",
      language:"English",
    },
    {
      movieImg:"assets/Premiume/PRE5.avif",
      movieName:"A Savannah hauntin",
      language:"English",
    }
  ];

  constructor(private http:HttpClient, private router: Router, private userService: UserService){}

  message = '';
  
  ngOnInit(): void {
    this.http.get('https://bookmyshow-backend-q1x9.onrender.com/api/user', { withCredentials: true })
      .subscribe((res: any) => {
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          if (err.status === 401) {
            this.message = "You are not logged in";
          } else {
            this.message = "An error occurred";
          }
          Emitters.authEmitter.emit(false);
        }
      );
  }
  

  selectedMovie: any;

  onSelectMovie(movieData:any){
    this.userService.setDetails(movieData);
    this.selectedMovie = movieData;
  }
}
