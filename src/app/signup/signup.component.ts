import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl:'./signup-component.html',
  styleUrls: ['./style.css']
})
export class SignupComponent implements OnInit {

    errorMsg;
    user = new User('','');


  constructor(public bookservice: BookService,
              public router: Router,
              private alertservice: AlertService) { }

  signUp(user){
      this.bookservice.signUp(user).subscribe(data => {
          console.log(data);
          if ( data === null ) {
            this.alertservice.success('email  is already taken',true);

        } else {
          this.alertservice.success('successfully registered', true);
          this.router.navigate(['/mybooks']);
      }
      },
        err => {this.errorMsg = err;
            // this.alertservice.success('Username  is already taken',true);
        })
  }

  onSubmit(event){

      this.user.email = event.target[0].value;
      this.user.password = event.target[2].value;
      this.user.displayName = event.target[1].value;

      // console.log(event)







      this.signUp(this.user);

      // if (this.isAuthenticated){
      //     console.log('The user is authorized.')
      // }
  }

  ngOnInit() {

  }

}
