import { Injectable } from '@angular/core';
import { CanActivate,  Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompteGuard implements CanActivate {
  constructor(private router:Router,private activatedRoute:ActivatedRoute){

  }
  canActivate(){
    const hashedid = this.activatedRoute.snapshot.paramMap.get("hashedid")
    if(hashedid)
    return true;
    else return false;
  }

}
