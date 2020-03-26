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
        if (req.url !== 'assets/ic_cpvs.json' && req.url !== 'assets/ic_naicses.json' && req.url !== 'assets/ic_unspsces.json') {
            let noNeedSpinner: Array<string> = ['v2/admin/users/check_email'];
            console.log(req.url);

            if (noNeedSpinner.indexOf(req.url) < 0) this.spinner.show = true;

            let noNeedSpinnerEndPoints: Array<string> = [];

            if (noNeedSpinnerEndPoints.indexOf(req.url.split("?", 2)[0]) >= 0) this.spinner.show = false;

            let headers;

            if (this.location.path() == '/login') {
                headers = new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded'
                });
            } else {
                headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + this.localStorage.retrieve('access_token'),
                    'Accept': 'application/json'
                });
            }

            req = req.clone({
                // url: req.url.split('/')[0] !== 'channel' ? environment.apiUrl + req.url: environment.socket + req.url,
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

                        if (req.url.indexOf('fetch_json=1') > -1) {
                            const result: any = res;
                            result.body = JSON.parse(res.body);
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

                            let errRes = JSON.parse(err.error);

                            if (!errRes.hasOwnProperty('warning')) {
                                // for (let error in errRes.errors){
                                let msg = errRes.errors.length ? (errRes.errors.length > 0 ? errRes.errors[0] : errRes.errors.file[0]) : errRes.errors.name
                                this.toasterService.error(msg, 'Error');
                                // }
                            } else if (errRes.hasOwnProperty('warning')) {
                                this.toasterService.error(errRes.warning, 'Warning');
                            }
                        }
                    }
                });
        } else {
            return next.handle(req);
        }
        // return next.handle(req);
    }

    cachedRequests: Array<HttpRequest<any>> = [];

    collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
    retryFailedRequests(): void {

    }
}
