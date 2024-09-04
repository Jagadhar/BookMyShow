import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent {
  movieList: any[] =[
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
  ]

  constructor(private router: Router, private userService: UserService ){}
  selectedMovie: any;

  onSelectMovie(movieData:any){
    this.userService.setDetails(movieData);
    this.selectedMovie = movieData;
  }
}
