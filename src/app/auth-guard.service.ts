import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import { BookService }      from './book.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(public bookservice: BookService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
  let url = `/${route.path}`;
  // console.log(url);   // /mybooks
  return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
     // return true;
    // console.log('bookservice:',this.bookservice);
    // if (this.bookservice.isLoggedIn) { return true; }
    if (localStorage.getItem('currentUser')) { return true; }
    // Store the attempted URL for redirecting
    this.bookservice.redirectUrl = url;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
        queryParams: { 'isLoggedIn': true },
        fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'],navigationExtras);
    return false;
  }
}
