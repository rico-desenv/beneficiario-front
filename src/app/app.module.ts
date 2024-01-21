import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/TokenInterceptor';
import { AuthService } from './auth/AuthService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdToastGlobal } from './components/toaster/toast-global.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CadastroComponent } from './components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent
  ],
  exports: [
    NgbdToastGlobal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbdToastGlobal,
    AutocompleteLibModule
  ],
  providers: [
    AuthService,
    ConfirmationDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
