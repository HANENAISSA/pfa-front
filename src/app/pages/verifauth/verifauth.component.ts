import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-verifauth",
  templateUrl: "./verifauth.component.html",
  styleUrls: ["./verifauth.component.scss"],
})
export class VerifauthComponent implements OnInit {
  // hashedid:number;
  validation:boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router
  ) {
    this.validation=false;
  }

  ngOnInit() {
    this.validateAccount();
  }
  async validateAccount() {
    const hashedid = this.activatedRoute.snapshot.paramMap.get("hashedid")
    try {
      (await this.authService.validate(hashedid)) as any;
      this.validation=true;
    } catch (error) {
      this.router.navigate(['/introuvable'])
      return error;
    }
  }
}
