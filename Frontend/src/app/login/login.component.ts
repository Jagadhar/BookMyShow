import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router){}

  loginForm = this.fb.group({
    email:this.fb.control('', [Validators.required, Validators.email]),
    password:this.fb.control('', Validators.required)
  })

  ValidateEmail = (email: any) =>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(validRegex)){
      return true;
    }
    else{
      return false;
    }
  }

  loginUser(): void{
    let user = this.loginForm.getRawValue();

    if(user.email == "" || user.password == ""){
      Swal.fire('Error','Please enter all the fields','error');
    }
    else if(!this.ValidateEmail(user.email)){
      Swal.fire('Error','Please enter a valid email address','error');
    }
    else{
      this.http.post('https://mywebpage-backend.onrender.com/api/login',user,{
        withCredentials:true
      })
      .subscribe((res) => {
        this.router.navigate(['/home'])
        },
        (err) =>{
          Swal.fire('Error',err.error.message,'error')
        }
        
      )
    }
  }

}
