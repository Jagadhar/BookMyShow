import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../Emitters/Emitter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {
  selectedMovie: any;
  selectedShowTime: string = '';
  bookSeatOfList: any[] = [];
  bookedSeats: any[] = [];
  selectedSeatCount: number = 0;
  totalCost: number = 0;


  constructor(private userService: UserService, private http: HttpClient) {
    const movieData = this.userService.getDetails();
    const showTime = this.userService.getShowTime();
    movieData.subscribe({
      next: (movieData: any) => {
        this.selectedMovie = movieData;
      },
      error: (err: any) => {
        console.log(err);
      }
    })

    showTime.subscribe({
      next: (showTime: any) => {
        this.selectedShowTime = showTime;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getSeatNoArray(totalSeats: any) {
    debugger;
    let seatArray = [];
    for (let i = 1; i <= totalSeats; i++) {
      seatArray.push(i)
    }
    return seatArray;
  }

  bookSeat(rowName: any, seatNo: any) {
    // Check if the seat is already booked
    const isAlreadyBooked = this.bookedSeats.find(m => m.rowName === rowName && m.seatNo === seatNo);
    // Check if the seat is already in the selected list
    const isDataExit = this.bookSeatOfList.find(m => m.rowName == rowName && m.seatNo == seatNo);
    // Only proceed if the seat is not booked and not already selected
    if (isDataExit == undefined && isAlreadyBooked == undefined) {
      const obj = {
        rowName: rowName,
        seatNo: seatNo,
      };
      this.bookSeatOfList.push(obj);
      this.selectedSeatCount++;
    }
    else {
      // If the seat is already in the selected list, remove it
      const rowIndexToDelete = this.bookSeatOfList.findIndex(m => m.rowName == rowName && m.seatNo == seatNo);
      this.bookSeatOfList.splice(rowIndexToDelete, 1);
      this.selectedSeatCount--;
    }
    this.totalCost = Number(this.selectedMovie.ticketRate) * Number(this.selectedSeatCount);
    debugger;

  }

  checkedIfSeatIsSelected(row: any, seat: any) {
    const isDataExit = this.bookSeatOfList.find(m => m.rowName == row && m.seatNo == seat);
    if (isDataExit == undefined) {
      return false;
    } else {
      return true;
    }
  }

  checkedIfSeatIsBooked(row: any, seat: any) {
    const isDataExit = this.bookedSeats.find(m => m.row == row && m.seatNumber == seat);
    if (isDataExit == undefined) {
      return false;
    } else {
      return true;
    }
  }

  email = '';
  //login User details fatch & email store
  ngOnInit(): void {
    this.http.get('https://bookmyshow-backend-q1x9.onrender.com/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.email = `${res.email}`;
          Emitters.authEmitter.emit(true);
          this.getBookedSeats(this.selectedMovie.movieName, this.selectedShowTime);
        }
      );
  }

  getBookedSeats(movieName: string,showTime: string) {
    this.http.get<any[]>(`https://bookmyshow-backend-q1x9.onrender.com/api/booking-seat?movieName=${movieName}&showTime=${showTime}`)
      .subscribe(data => {
        this.bookedSeats = data;
        console.log(this.bookedSeats);
      }, error => {
        console.error('Error fetching booked seats:', error);
      });
  }

  //booking conformation and store the booking data
  bookingDetails: any;
  bookMovie(email: any, movieData: any, showTime: any, seat: any, cost: any) {
    this.userService.setBookingDetails(email, movieData, showTime, seat, cost);
    this.bookingDetails = {
      userId: email,
      movieName: movieData,
      showTime: showTime,
      rows: seat,
      ticketPrice: cost
    };
  }


  postBookingData() {
    const apiUrl = 'https://bookmyshow-backend-q1x9.onrender.com/api/bookings'; // Replace with your API URL
    this.http.post(apiUrl, this.bookingDetails)
      .subscribe({
        next: (response) => {
          Swal.fire("Booking Successful");
          console.log('Booking saved successfully!', response);
          //console.log(this.bookingDetails);
        },
        error: (error) => {
          console.error('Error saving booking:', error);
        }
      });
  }

}
