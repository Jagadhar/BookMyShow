import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  selectedMovie: any;
  selectedShow: string ='';

  constructor(private userService: UserService){
    debugger;
    const movieData = this.userService.getDetails();
    movieData.subscribe({
      next: (movieData :any) =>{
        this.selectedMovie = movieData;
      },
      error : (err:any) =>{
        console.log(err);
      }
    })
    
  }

  onSelected(show:string){
    this.selectedShow = show;
  }

  onSelectedShow(selectedShow:string){
    this.userService.setShowTime(selectedShow);
    this.selectedMovie = selectedShow;
  }
}
