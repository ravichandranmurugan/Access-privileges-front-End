import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './core/service/authentication.service';
import { UserService } from './service/user/user.service';
import {AuthInterceptor} from './core/interceptor/auth.interceptor'
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { NotificationModule } from './module/notification/notification.module';
import {NotificationService} from './core/service/notification.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/module/material/material.module';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [
    AppComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule
  ],
  providers: [NotificationService,AuthenticationService,UserService,],
  bootstrap: [AppComponent],
  // providers: [NotificationService,AuthenticationGuard,AuthenticationService,UserService,
  //   {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  // bootstrap: [AppComponent],
})
export class AppModule { }
