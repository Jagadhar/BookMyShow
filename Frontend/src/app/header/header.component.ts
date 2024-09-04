import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../Emitters/Emitter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  authenticated = false;
  user = '';

  constructor( private http:HttpClient){}


  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean) => {
     this.authenticated =auth ;
    });
 }

  logout():void{
    this.http.post('https://bookmyshow-backend-q1x9.onrender.com/api/logout',{},
    {withCredentials: true})
    .subscribe(() => this.authenticated = false);
  }
}
