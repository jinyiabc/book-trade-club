import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponentComponent } from './my-component/my-component.component';
import { MyRouting } from './my-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyRouting
  ],
  declarations: [MyComponentComponent]
})
export class MyModuleModule { }
