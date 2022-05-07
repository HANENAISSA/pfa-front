import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { SharedServiceService } from "../services/shared-service.service";
import { TokenInterceptorService } from "../services/token-interceptor.service";

@Injectable({
  providedIn: "root",
})
export class EntrepriseGuard implements CanActivateChild,CanLoad,CanActivate {
  constructor(
    private router: Router,
    private sharedService: SharedServiceService,
    private interceptor:TokenInterceptorService
  ) {}
  canActivate(){
    return true;
  }
  canActivateChild(): boolean {
    // const id_role = this.sharedService.getCookie("id_role");
    // const token = this.sharedService.getCookie("token");
    // if (id_role === "2") {
      return true;
    // } else {
    //   return false;
    // }
  }
  canLoad(){
    return true;
  }
}
