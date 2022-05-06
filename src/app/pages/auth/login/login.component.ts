import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SharedServiceService } from "../../../services/shared-service.service";
import swal from "sweetalert";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sharedService: SharedServiceService,
    private router:Router
  ) {}

  ngOnInit() {}

  async login(form: NgForm) {
    const payload = { ...form.value };
    try {
      const { err, id_role, token } = (await this.authService.login(
        payload
      )) as any;
      if (!err) {
        this.sharedService.setCookie("token", token, 7);
        this.router.navigate(['/etudiant']);
      }
    } catch (error) {
      swal("Echec!", error.error.message, "error");
      return error;
    }
  }
}
