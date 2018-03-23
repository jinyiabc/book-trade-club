import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css']
})
export class AllbooksComponent implements OnInit {
    public books = [];
    public errorMsg;
    book = {
        	"owner": "123@123.com",
        	"email": "test1@test1.com",
            "thumbnail":"",
        	"title": "Casino"
        };
    isTraded = true;

    constructor(private _bookService: BookService,
                private globalEventsManager: GlobalEventsManager) { }

    // owner:"123@123.com"
    // requester:null
    // thumbnail:"http://books.google.com/books/content?id=D7x6KpSh1xkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
    // title:"Illumination"

    email = JSON.parse(localStorage.getItem('currentUser')).email;


    onClick(book){
        book.requester = JSON.parse(localStorage.getItem('currentUser')).email;
        console.log(book);

        this._bookService.tradeRequest(book)
            .subscribe( () => book.isTraded = true,
                        err => this.errorMsg = err);

    }

    ngOnInit() {
        this._bookService.getBooks()
            .subscribe(data => this.books = data,
                    error => this.errorMsg = error);
        this.globalEventsManager.showNavBar(true);

    }

}
