import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm : FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) { 
    this.registerForm = this.fb.group({
      name:this.fb.control('',Validators.compose([Validators.required, Validators.pattern(/^[a-zA-z]+(?: [a-zA-Z]+)*$/)])),
      email:this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      phone:this.fb.control('',Validators.compose([Validators.required])),
      password:this.fb.control('',Validators.compose([Validators.required]))
      // confirmPassword:this.fb.control('', Validators.compose([Validators.required])),
      // checkBox:this.fb.control('',Validators.compose([Validators.required])),
    }
    // { validators: passwordMatchValidator  }
    )
  }

  ngOnInit(): void {}

  ValidateEmail = (email: any) =>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(validRegex)){
      return true;
    }
    else{
      return false;
    }
  }

  ValidatePhone = (phone: number): boolean =>{
    const validPhone = /^[0-9]{10}$/;
    const phoneString = phone.toString();

    return validPhone.test(phoneString);
  }

  onSubmit() {
    let user = this.registerForm.getRawValue()
    console.log(user)

    if(user.name == "" || user.email == "" || user.phone == "" || user.password == ""){
      Swal.fire("Error","Please enter all the fields","error")
    }
    else if(!this.ValidateEmail(user.email)){
      Swal.fire("Error","Please enter a valid email","error")
    }
    else if(!this.ValidatePhone(user.phone)){
      Swal.fire("Error","Please enter a valid phone number","error")
    }
    else{
      this.http.post("https://bookmyshow-backend-q1x9.onrender.com/api/register",user,{
        withCredentials:true
      })
      .subscribe( () => this.router.navigate(['/home']),(err) =>{
        Swal.fire("Error",err.error.message,"error")
      })
    }
  }

}
