import { Component } from '@angular/core';
import { MainRequestService } from '../../services/main-request.service';
import { AuthenticationService } from '../../modules/authorization/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(
      private request: MainRequestService,
      private authService: AuthenticationService
  ){}
  
  public logout(){

      this.request.postData('v1/auth/logoff', {}).subscribe( res => {
          this.authService.logout();
      });

  }

}
