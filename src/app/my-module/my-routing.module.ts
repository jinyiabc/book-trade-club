import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard }                from '../auth-guard.service';
import { SettingsComponent } from '../settings/settings.component';
import { MyComponentComponent } from './my-component/my-component.component';

const myRouting: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
          { path: '', component: MyComponentComponent }
        ]

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(myRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class MyRouting {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
