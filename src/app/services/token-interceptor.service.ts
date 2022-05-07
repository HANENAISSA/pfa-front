import { Injectable, Injector } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { SharedServiceService } from "./shared-service.service";
@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(SharedServiceService);
    const token = authService.getCookie("token");
    let tokenizedreq;
    //inject id_role test!!!
    // if(token){

      tokenizedreq = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    // }else{
      //injector.call refreshToken
      //setcookie
      // tokenizedreq = req.clone({
      //   setHeaders: {
      //     authorization: `Bearer ${token}`,
      //   },
      // });
    // }
    return next.handle(tokenizedreq);
  }
}
