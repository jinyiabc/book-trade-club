import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';    // http
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {LoginRoutingModule } from './login/login-routing.module';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { StickyfooterComponent } from './stickyfooter/stickyfooter.component';
import { BookService } from './book.service';
import {AuthGuard} from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AlertService } from './alert/alert.service';
import { AlertComponent } from './alert/alert.component';
import { GoogleBooksService } from './google-books';
import { GlobalEventsManager } from './GlobalEventsManager';
// import { MybooksModule } from './mybooks/mybooks.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    NavbarComponent,
    AlertComponent,
    StickyfooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoginRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,    // http
    AppRoutingModule
  ],
  providers: [BookService, AuthGuard, AlertService, GoogleBooksService, GlobalEventsManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
