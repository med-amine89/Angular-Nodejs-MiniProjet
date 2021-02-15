import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from './shared/password.validator';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  registration: any;
  submited: boolean = false;
  
  
  constructor(private router: Router,
    private http: HttpClient,
    private userservice: UserService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&]).{0,8}$")]),
      confirmpassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    }, { validators: PasswordValidator });

  }
  // REGISTER USER 

  registerUser() {
    
    if (!this.registrationForm.valid || (this.registrationForm.controls.password.value != this.registrationForm.controls.confirmpassword.value)) {
      console.log('Invalid Form'); return;
    }
    this.userservice.register(this.registrationForm.value)
      .subscribe(
        (use: any) => { console.log(use)
          localStorage.setItem('token', use.token)
          this.router.navigate(['/login'])
        },
        error => console.error(error)
      )
  
    // console.log(JSON.stringify(this.registrationForm.value));

  }


}

