import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './features/auth/register/register.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterComponent
  ],
  bootstrap: []
})
export class AppModule { }