import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import  { environment } from '../../environments/environment';
import { IBook } from '../book';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../alert/alert.service';
import { GoogleBooksService } from '../google-books';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {
    // approved_list: any;
    navigationExtras: any;
    public myBooks = [];
    public errorMsg;
    public newBook = new IBook('','default','default',false,false);
    isLoggedIn: Observable<string>;

    submitted = false;
    length;
    approve_length
    email = JSON.parse(localStorage.getItem('currentUser')).email;
    public request_list;
    public approve_list;
    public approved_list;



  constructor(public _bookService: BookService,
              private route: ActivatedRoute,
              private alertservice:AlertService,
              private googlebook: GoogleBooksService,
              private globalEventsManager: GlobalEventsManager) { }
  onSubmit(event){
      this.submitted = true;
      console.log(event.target[0].value);
      // console.log(this.myBooks)
      const title = event.target[0].value;
      this.googlebook.searchBooks(title)
                    .subscribe( data => {
                        this.newBook.title = data[0]['volumeInfo']['title'];
                        this.newBook.owner = this.email;
                        this.newBook.thumbnail = data[0]['volumeInfo']['imageLinks']['smallThumbnail'];
                        this.newBook.isTraded = false;
                        console.log(this.newBook)
                        this._bookService.addBook(this.newBook)
                                               .subscribe(
                                                      data => {
                                                          let isExisted = false;
                                                          for(let i=0; i<this.myBooks.length; i++){
                                                              if(this.myBooks[i]['title'] === data['title']){
                                                                  isExisted = true;
                                                              }
                                                          }
                                                          if (isExisted) {
                                                              this.alertservice.success('The book has already registered', true);
                                                              console.log('The book has already registered')
                                                              return this.myBooks;
                                                          } else {
                                                              // this.alertservice.success('This is a new book.', true);
                                                              console.log('This is a new book.');
                                                            return this.myBooks.push(data);
                                                          }
                                                      },
                                                      error => this.errorMsg = error);
                    },
                                error => this.errorMsg = error);

    }
  deleteBook(title){
      this.myBooks = this.myBooks.filter(book => book.title !== title);
      console.log(this.myBooks);
      this._bookService.deleteBook(title)
                       .subscribe();
  }

  removeRequest(book){
      this.request_list = this.request_list.filter(data => data.title !== book.title);
      this.length = this.request_list.length
      this._bookService.removeRequest(book).subscribe();
  }

  rejectRequest(book){
      this.approve_list = this.approve_list.filter(data => data.title !== book.title);
      // this.request_list = this.request_list.filter(data => data.title !== book.title);
      this.approve_length = this.approve_list.length
      this._bookService.rejectRequest(book).subscribe();
  }

  cancelApprovedRequest(book){
      this.approved_list = this.approved_list.filter(data => data.title !== book.title);
      this._bookService.rejectRequest(book).subscribe();
  }

  approveRequest(book){
      this.approve_list = this.approve_list.filter(data => data.title !== book.title);
      // this.request_list = this.request_list.filter(data => data.title !== book.title);
      this.approve_length = this.approve_list.length;
      this.approved_list.push(book);
      this._bookService.approveRequest(book).subscribe();
  }

  ngOnInit() {
      this._bookService.getMybooks(this.email)
          .subscribe(data => this.myBooks = data,
                  error => this.errorMsg = error);
      console.log('Auth test',this._bookService.isLoggedIn);  // false nomatter private or public;
      this._bookService.getMyRequests(this.email)
          .subscribe( data => {this.request_list = data;
                                this.length = data.length;},
                      err => this.errorMsg = err);

      this._bookService.getOthersRequests(this.email)
          .subscribe( data => {this.approve_list = data;
                                this.approve_length = data.length;},
                      err => this.errorMsg = err);

      this._bookService.getOthersApprovedRequests(this.email)
          .subscribe( data => this.approved_list = data,
                      err => this.errorMsg = err);
      this.globalEventsManager.showNavBar(true);



  }

}
