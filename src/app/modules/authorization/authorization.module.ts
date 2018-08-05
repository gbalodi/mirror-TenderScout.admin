import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthorizationRoutingModule } from './authorization-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ],
  declarations: [
      LoginComponent,
      ForgotPassComponent
  ],
  providers: [
      AuthService,
      AuthGuard,
  ]
})

export class AuthorizationModule { }
