import { Component, OnInit, NgZone } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    errorMsg: any;
    showNavBar: boolean = false;

  constructor(public bookservice: BookService,
              private route: ActivatedRoute,
              private zone:NgZone,
              private globalEventsManager: GlobalEventsManager) {}
  isLoggedIn;
  // email = JSON.parse(localStorage.getItem('currentUser')).email;

  logout() {
      this.bookservice.logout();
  }
  ngOnInit() {

  // this.route
  //   .queryParamMap
  //   .map(params => {
  //           this.test = param    s.get('isLoggedIn');
  //           console.log(this.test);
  //       });
  this.zone.run(() =>
        this.bookservice.checkedLogin().subscribe(
            data => this.isLoggedIn = data,
            err => this.errorMsg = err ));

    this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
        this.showNavBar = mode;
        });

   // this.bookservice.checkedLogin().subscribe( data => {
   //     this.isLoggedIn = data;
   // }, err => this.errorMsg = err );

}
}
