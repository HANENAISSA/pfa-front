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
    const tokenizedreq = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    return next.handle(tokenizedreq);
  }
}
