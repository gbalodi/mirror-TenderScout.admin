import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/first';
import { Location } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../modules/authorization/services';
import { SpinnerService } from '../modules/spinner/spinner.service';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        public router: Router,
        private localStorage: LocalStorageService,
        private authService: AuthenticationService,
        private spinner: SpinnerService,
        private toasterService: ToastrService,
        private location: Location
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show = true;

        let headers;

        if(this.location.path() == '/login'){
            headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        }else{
            headers = new HttpHeaders({
                'Authorization': 'Bearer ' + this.localStorage.retrieve('access_token'),
                'Accept': 'application/json'
            });
        }

        req = req.clone({
            url: environment.apiUrl + req.url,
            responseType: 'text',//needed to avoid problem witch shows 201 status as error. don't forget to JSON.parse data
            headers
            // headers: req.headers.set('Authorization', 'Bearer ' + this.localStorage.retrieve('access_token'))
        });
        return next.handle(req)
            .do((res: HttpEvent<any>) => {
                if (res instanceof HttpResponse) {

                    this.spinner.show = false;

                    // If response is "204 Not Content" then returns an empty array list
                    if (res.status === 204) {
                        const result: any = res;
                        result.body = { data: [] };
                        return result;
                    }
                }

                return res;

            }, (err: any) => {

                this.spinner.show = false;

                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.collectFailedRequest(req);

                        this.authService.logout();

                        this.toasterService.error('Ooops, error', 'Authorization failed. Please login again.');

                    }
                    if (err.status === 500) {
                        this.toasterService.error('Ooops, error', 'Try again');
                    }
                    if (err.status === 422) {

                        let errRes = JSON.parse( err.error );

                        if(errRes){
                            for (let error in errRes.errors){
                                this.toasterService.error(errRes.errors[error][0], error);
                            }
                        }
                    }
                }
            });
        // return next.handle(req);
    }

    cachedRequests: Array<HttpRequest<any>> = [];

    collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
    retryFailedRequests(): void {

    }
}
