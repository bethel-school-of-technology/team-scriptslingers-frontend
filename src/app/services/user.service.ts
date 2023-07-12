import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  authURL: string = "https://localhost:7197/api/auth";
  currentUser: any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private currentUserEmailSubject = new BehaviorSubject<string | null>(null);
  currentUserEmail$ = this.currentUserEmailSubject.asObservable();

  isAdmin: boolean = false;

  constructor(private http: HttpClient) { }

  signUp(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.authURL}/register`, newUser);
  }

  login(email: string, password: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('email', email)
      .append('password', password);

    return this.http.get(`${this.authURL}/login`, { params: queryParams, responseType: 'text' })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('MoWildToken', response);
          localStorage.setItem('isLoggedIn', 'true');
          console.log('The value of isLoggedIn:', localStorage.getItem('isLoggedIn'));

          // Decode the JWT token
          const token = response;
          const jwtHelper = new JwtHelperService();
          const decodedToken = jwtHelper.decodeToken(token);
          console.log('decoded token', decodedToken);
          const isAdmin = decodedToken.isAdmin.toLowerCase() === 'true';

          this.isAdminSubject.next(isAdmin);

          this.isLoggedInSubject.next(true);

          alert('Login was successful');
        }),
        catchError((error: any) => {
          // Handle error and provide feedback to the user
          console.error('Login error:', error);
          return throwError('Login failed. Please try again.');
        })

      );

  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('MoWildToken');
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

  determineUserRole(): void {
    const userRoles: string[] = ['isAdmin'];
    // Check if the user has an admin role
    this.isAdmin = userRoles.includes('isAdmin');
  }

  setCurrentUserEmail(email: string): void {
    this.currentUserEmailSubject.next(email);
  }


}
