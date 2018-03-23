import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public bookservice: BookService) { }

  ngOnInit() {
      console.log('Auth test:',this.bookservice.isLoggedIn);
  }

}
