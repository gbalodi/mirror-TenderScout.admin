import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/first';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { LoginService } from '../modules/authorization/services';
import { SpinnerService } from '../modules/spinner/spinner.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    private toasterService: ToasterService;

    constructor(
        public router: Router,
        private localStorage: LocalStorageService,
        private loginService: LoginService,
        private spinner: SpinnerService,
        toasterService: ToasterService,
        private location: Location
    ) {
        this.toasterService = toasterService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show = true;

        const url = 'http://api.dev.tenderscout.braincode.xyz/api/';
        let headers;

        if(this.location.path() == '/login'){
            headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        }else{
            headers = new HttpHeaders({
                'Authorization': 'Bearer ' + this.localStorage.retrieve('access_token'),
            });
        }
        


        req = req.clone({
            url: url + req.url,
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

                        this.loginService.authErr = true;

                        this.router.navigate(['/login']);

                    }if (err.status === 500) {
                        this.toasterService.pop('error', 'Ooops, error', 'Try again');
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
