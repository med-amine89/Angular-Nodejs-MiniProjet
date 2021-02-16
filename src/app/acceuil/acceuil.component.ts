import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './passwordvalidation/passwordacceuil.validator';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
  providers: [UserService]
})
export class AcceuilComponent implements OnInit {
  selectedUser: any;
  users: any = [];
  id;
  registrationForm: FormGroup;
  registration: any;
  submited: boolean = false;

  constructor(private userservice: UserService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&]).{0,8}$")]),
      confirmpassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    }, { validators: PasswordValidator });
    this.resetForm();
    this.refreshUserList();
  }

  resetForm() {
    if (this.registrationForm)
      this.registrationForm.reset();
    this.userservice.selectedUser = {
      _id: "",
      email: "",
      password: "",
      confirmpassword: "",
      name: "",
      lastname: "",
    }
  }

  // send user to db
  onSubmit() {
    this.userservice.updateUser(this.id,this.registrationForm.value).subscribe((res) => {
      // this.resetForm();
      console.log(this.registrationForm);
    });
  }
  // get all users dans un tableau pour supprimer ou editer
  refreshUserList() {
    this.userservice.getUserList().subscribe((res) => {
      this.users = res;
    });
  }

  // delete user from db and tableau
  onDelete(_id: String) {
    this.userservice.deleteUser(_id).subscribe((res) => {
      this.refreshUserList();
      this.resetForm();
    });
  }

  // update user in db and tableau
  onEdit(_id: String) {
    this.id= _id;
    this.userservice.getUser(_id).subscribe((use) => {
      this.registrationForm.patchValue(use);
    });
  }
}
