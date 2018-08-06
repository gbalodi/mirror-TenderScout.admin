import { Component } from '@angular/core';
import { AuthService } from '../../modules/authorization/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(
      public auth: AuthService
  ){}
}
