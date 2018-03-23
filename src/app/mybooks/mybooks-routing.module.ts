import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard }                from '../auth-guard.service';
import { MybooksComponent } from './mybooks.component';
import { SettingsComponent } from '../settings/settings.component';

const mybooksRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
          { path: '', component: MybooksComponent },
          { path: 'settings', component: SettingsComponent },
        ]

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mybooksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MybooksRoutingModule {}
export const mybooksRoutingComponents = [
                                  SettingsComponent,
                                  MybooksComponent
                               ];

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
