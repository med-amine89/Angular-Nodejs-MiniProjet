import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let userservice = this.injector.get(UserService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
