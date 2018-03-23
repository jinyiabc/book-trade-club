import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';



import { MybooksRoutingModule, mybooksRoutingComponents } from './mybooks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MybooksRoutingModule
  ],
  declarations: [
    mybooksRoutingComponents
  ]
})
export class MybooksModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
