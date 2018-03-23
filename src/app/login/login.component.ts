import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { User } from '../user';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AlertService } from '../alert/alert.service';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  selector: 'app-login',
  templateUrl:'./login-component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

    public auth;
    public isAuthenticated;
    public errorMsg;
    public user = new User('','');
                    // {email: '123@123.com',
                    // password: '123'}

  constructor(public bookservice: BookService,
              public router: Router,
              private AuthGuard: AuthGuard,
              private alertservice: AlertService,
              private globalEventsManager: GlobalEventsManager) { }
  // isLoggedin(){
  //     this._bookService.isLoggedin().subscribe(data =>this.auth = data,
  //     error => this.errorMsg = error);
  // }

  logIn(user){
      this.bookservice.logIn(user).subscribe(data => {

          if(this.bookservice.isLoggedIn){
              // Get the redirect URL from our auth service
              // If no redirect has been set, use the default
              let redirect = this.bookservice.redirectUrl ? this.bookservice.redirectUrl : '/mybooks';
              this.bookservice.isLoggedIn = true;
              let navigationExtras: NavigationExtras = {
                  queryParams: { 'isLoggedIn':  true},
                  fragment: 'anchor',
                  skipLocationChange: false
              };
              // Redirect the user
              this.alertservice.success('login successful', true);
              this.globalEventsManager.showNavBar(true);
              this.router.navigate([redirect],navigationExtras);

          }


          },
        error => {this.errorMsg = error;
            this.alertservice.success('Login failed', true);
        });

  }

  onSubmit(event){

      this.user.email = event.target[0].value;
      this.user.password = event.target[1].value;
      this.logIn(this.user);
      // if (this.isAuthenticated){
      //     console.log('The user is authorized.')
      // }
  }

  ngOnInit() {
  }

}
