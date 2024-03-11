// app.module.ts

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // ... otros componentes
  ],
  imports: [
    BrowserModule,
    FormsModule, // Agrega FormsModule aquí
    // ... otros módulos
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
