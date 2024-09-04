import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private movieDetails = new BehaviorSubject("");
  constructor(private http:HttpClient){};

  // Share selectedMovie all data ............
  setDetails(movieData:any){
    this.movieDetails.next(movieData);
  }

  getDetails(){
    return this.movieDetails.asObservable();
  }


  // share searchMovie show time ....... 

  private time = new BehaviorSubject("");
  setShowTime(showTime:any){
    this.time.next(showTime);
  }

  getShowTime(){
    return this.time.asObservable();
  }

  // booking details..........
  private bookingDetails = new BehaviorSubject<any>({});
  setBookingDetails(email: any,movieData : any , showTime:any, seat :any, cost: any){
    const obj = {
      email: email,
      movieName: movieData,
      showTime: showTime,
      rows: seat,
      ticketPrice: cost
    };
    this.bookingDetails.next(obj);
  }

  getBookingDetails(){
    return this.bookingDetails.asObservable();
  }
}
