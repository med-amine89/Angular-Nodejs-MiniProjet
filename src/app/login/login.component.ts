import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registrationForm: FormGroup;
  registration: any;
  submited: boolean = false;

  constructor(private router: Router,
    private userservice: UserService) { }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&]).{0,8}$")]),
    });
  }

  // LOGIN USER WITH TOKEN
  loginUser() {
    if (!this.registrationForm.valid) {
      console.log('Invalid'); return;
    }
    // console.log(JSON.stringify(this.registrationForm.value));
    this.userservice.login(JSON.stringify(this.registrationForm.value))
      .subscribe(
        (use: any) => {
          console.log(use),
            localStorage.setItem('token', use.token)
          this.router.navigate(['/acceuil'])
        },
        error => console.error(error)
      )
  }
}