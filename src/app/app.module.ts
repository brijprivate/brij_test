import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import {FormsModule} from '@angular/forms';
import { NotifierModule } from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NotifierModule.withConfig({

      position: {horizontal: { position: 'right'},  vertical: {position:'top',    distance: 20
    }
      }

    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
