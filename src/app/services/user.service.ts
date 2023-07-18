import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';


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

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isAdmin: boolean = false;

  constructor(private http: HttpClient, private location: Location) { 
    this.checkAuthState();

  }

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

  setCurrentUser(firstName: string, lastName: string): void{
    const currentUser: User = {
      firstName: firstName,
      lastName: lastName
    };

    this.currentUserSubject.next(currentUser);
  }

  isAuthenticated(): boolean{
    return this.isLoggedInSubject.value;
  }

  authStateChanged(): Observable<boolean>{
    return this.isLoggedInSubject.asObservable();
  }

  adminStateChanged():Observable<boolean>{
    return this.isAdminSubject.asObservable();
  }

  getIsAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('MoWildToken'); // Retrieve the JWT token from local storage or other storage mechanism

    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);// Decode the token and check for expiration, integrity, etc.
      const isAdmin = decodedToken.isAdmin || false; // Extract the 'isAdmin' flag from the token, defaulting to false

      this.isLoggedInSubject.next(true); // User is logged in
      this.isAdminSubject.next(isAdmin); // Set the 'isAdmin' value accordingly
    } else {
      this.isLoggedInSubject.next(false); // User is not logged in
      this.isAdminSubject.next(false); // Set 'isAdmin' to false
    }
  }

  decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
  return jwtHelper.decodeToken(token); 
  }


}
