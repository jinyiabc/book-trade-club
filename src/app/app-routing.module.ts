import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { SettingsComponent } from './settings/settings.component';
import { AllbooksComponent } from './allbooks/allbooks.component';
// import { MybooksComponent } from './mybooks/mybooks.component';
import { PageNotFoundComponent } from './not-found.component';
import { AuthGuard }                from './auth-guard.service';

const routes: Routes = [
                        {path:'signup',component:SignupComponent},
                        {path:'allbooks',component:AllbooksComponent},
                        {path:'mybooks',
                        loadChildren: 'app/mybooks/mybooks.module#MybooksModule'
                        // canLoad:[AuthGuard]
                        },
                        { path: '**', component: PageNotFoundComponent }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  SignupComponent,
                                  // SettingsComponent,
                                  // MybooksComponent,
                                  AllbooksComponent,
                                  PageNotFoundComponent
                               ];
