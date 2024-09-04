import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emitters } from '../Emitters/Emitter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  message = false;
  booking = false;
  user = false;
  password = false;

  name = '';
  phone = '';
  email = '';
  authenticated = false;


  // booking Details..........
  bookingDetails: any;
  constructor(private userService: UserService, private http: HttpClient) {
    const bookingData = this.userService.getBookingDetails();
    bookingData.subscribe({
      next: (bookingData: any) => {
        this.bookingDetails = bookingData;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  userInfo() {
    this.user = true;
    this.booking = false;
    this.message = true;
    this.password = false;
  }
  bookingList() {
    this.booking = true;
    this.user = false;
    this.message = true;
    this.password = false;
  }
  changePassword() {
    this.message = true;
    this.user = false;
    this.booking = false;
    this.password = true;
  }

  bookings: any[] = [];
  ngOnInit(): void {
    //login User details fatch & show 
    this.http.get('https://mywebpage-backend.onrender.com/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.name = `${res.name}`;
        this.phone = `${res.phone}`;
        this.email = `${res.email}`;
        Emitters.authEmitter.emit(true);

        this.getBookingsByUserId();
      }
    );
  }


  getBookingsByUserId(): void {
    const userId = this.email;
    const url = `https://mywebpage-backend.onrender.com/api/bookings?userId=${userId}`;
    this.http.get<any[]>(url)
      .subscribe( data => {
          this.bookings = data;
        },
        error => {
          console.error('Error fetching bookings', error);
        }
      );
  }

  //logout function
  logout(): void {
    this.http.post('https://mywebpage-backend.onrender.com/api/logout', {},
      { withCredentials: true })
      .subscribe(() => this.authenticated = false);
  }

  //Booking status update
  updateStatus(bookingId: string, status: string) {
    const url = `https://mywebpage-backend.onrender.com/api/bookings/${bookingId}`;
    this.http.put(url, { status }).subscribe({
      next: (response) => {
        console.log('Status updated successfully', response);
      },
      error: (error) => {
        console.error('Error updating status', error);
      },
    });
  }

  //auto page reload
  reloadPage() {
    window.location.reload();
  }
}
