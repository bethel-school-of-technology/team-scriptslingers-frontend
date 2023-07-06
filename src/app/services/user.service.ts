import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authURL: string = "https://localhost:7197/api/auth";
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  signUp(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.authURL}/register`, newUser);
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);
    return this.http.get(`${this.authURL}/login`, { params: queryParams, responseType: 'text' })
      .pipe(tap((response: any) => {
        localStorage.setItem('myEventToken', response);
        localStorage.setItem('isLoggedIn', 'true');
        console.log('The value of IsLoggedIn: ', "'isLoggedIn'")
      }));
  }

  getUser() {
    let user = localStorage.getItem('MoWildToken');
    if (user) {
      var base64Url = user.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    return{};
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('myEventToken');
    localStorage.removeItem('isLoggedIn');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.authURL)
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.authURL + "/" + id);
  }

  updateUser(id: number, edittedUser: User): Observable<User> {
    return this.http.put<User>(this.authURL + "/" + id, edittedUser);
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete<any>(this.authURL + "/" + id)
  }


}
