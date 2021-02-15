import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: any;
  users: any[];
  readonly baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  postUser(use: any) {
    return this.http.post(this.baseURL, use);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }
  getUser(id) {
    return this.http.get(`${this.baseURL}/${id}`);
  }
  updateUser(id, use) {
    return this.http.put(`${this.baseURL}/${id}`, use);
  }
  deleteUser(id: String) {
    return this.http.delete(this.baseURL + `/${id}`);
  }

  //  Register user (service)
  register(body: any) {
    return this.http.post('http://localhost:3000/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // login user (service)
  login(body: any) {
    return this.http.post('http://localhost:3000/users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')

    });
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }


  // authorization user token with Bearer
  getToken() {
    return localStorage.getItem('token')
  }

}

