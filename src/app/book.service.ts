import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // http request
import { Observable } from 'rxjs/Observable' //Reactive extension for javascript "rxjs": "^5.5.2",
import { IBook } from './book';
import { User } from './user';
import { Auth } from './auth';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import  { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';


@Injectable()
export class BookService {
    private _url: string = environment.app_url + "/allbooks";
    private addUrl: string = environment.app_url + "/mybooks";
    // private deleteUrl: string = environment.app_url + "/mybooks";

  constructor(private http: HttpClient) { } // DI

  logIn(user:User):Observable<Auth>{
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      const myUrl = environment.app_url + "/login";
      return this.http.post<User>(myUrl, user, httpOptions)
                      .map(user => {
                          if(user){
                              localStorage.setItem('currentUser', JSON.stringify(user));
                              this.isLoggedIn = true;
                          }
                          return user;
                      })
                      .catch(this.errorHandler);
  }
  logout(): void {
      localStorage.removeItem('currentUser');
  }

  signUp(user:User){
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      const myUrl = environment.app_url + "/signup";
      return this.http.post<User>(myUrl, user, httpOptions)
                      .map(user => {
                          if(user){
                              localStorage.setItem('currentUser', JSON.stringify(user));
                              this.isLoggedIn = true;
                          }
                          return user;
                      })
                      .catch(this.errorHandler);

  }

  checkedLogin():Observable<any>{
      const status = JSON.parse(localStorage.getItem('currentUser'));
      if (status === null || status.length === 0){
          return Observable.of(false);
      }
      return Observable.of(status.withCredentials);
  }


  isLoggedIn = false;
  email: string;
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  getBooks():Observable<IBook[]>{
      return this.http.get<IBook[]>(this._url)
      .catch(this.errorHandler);
  }
  getMybooks(email: string):Observable<IBook[]>{
      const myUrl = environment.app_url + `/mybooks/${email}`;
      return this.http.get<IBook[]>(myUrl)
      .catch(this.errorHandler);
  }

  getMyRequests(email: string):Observable<IBook[]>{
      const myUrl = environment.app_url + `/myrequests/${email}`;
      return this.http.get<IBook[]>(myUrl)
      .catch(this.errorHandler);
  }

  getOthersRequests(email: string):Observable<IBook[]>{
      const myUrl = environment.app_url + `/otherRequest/${email}`;
      return this.http.get<IBook[]>(myUrl)
      .catch(this.errorHandler);
  }

  getOthersApprovedRequests(email: string):Observable<IBook[]>{
      const myUrl = environment.app_url + `/otherApprovedRequest/${email}`;
      return this.http.get<IBook[]>(myUrl)
      .catch(this.errorHandler);
  }

  // isLoggedin():Observable<Auth>{
  //     const myUrl = environment.app_url + "/isauth";
  //     // const myUrl = '../assets/data/test.json';
  //     return this.http.get(myUrl)
  //     .catch(this.errorHandler);
  // }
  // private addUrl: string = environment.app_url + "/mybooks";

  addBook(book:IBook):Observable<IBook>{
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      const email = JSON.parse(localStorage.getItem('currentUser')).email;
      const addUrl1 = environment.app_url + `/mybooks/${email}`;
      return this.http.post<IBook>(addUrl1, book, httpOptions)
                      .catch(this.errorHandler)
  }

  tradeRequest(book:IBook){
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      // const email = JSON.parse(localStorage.getItem('currentUser')).email;
      const addUrl2 = environment.app_url + "/traderequest";
      return this.http.post<IBook>(addUrl2, book, httpOptions)
                      .catch(this.errorHandler)

  }

  approveRequest(book:IBook){
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      // const email = JSON.parse(localStorage.getItem('currentUser')).email;
      const addUrl5 = environment.app_url + "/approveRequest";
      return this.http.post<IBook>(addUrl5, book, httpOptions)
                      .catch(this.errorHandler)

  }

  rejectRequest(book:IBook){
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      // const email = JSON.parse(localStorage.getItem('currentUser')).email;
      const addUrl4 = environment.app_url + "/rejectRequest";
      return this.http.post<IBook>(addUrl4, book, httpOptions)
                      .catch(this.errorHandler)

  }

  removeRequest(book:IBook){
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
          })
      };
      // const email = JSON.parse(localStorage.getItem('currentUser')).email;
      const addUrl3 = environment.app_url + "/removerequest";
      return this.http.post<IBook>(addUrl3, book, httpOptions)
                      .catch(this.errorHandler)

  }



  deleteBook(title:string):Observable<{}>{


  const deleteUrl = environment.app_url + "/mybooks" + `/${title}`;
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
      })
  };

  return this.http.delete(deleteUrl, httpOptions)
                  .catch(this.errorHandler);

}




  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

}
