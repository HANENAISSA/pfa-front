import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SharedServiceService } from "../../../services/shared-service.service";
import swal from "sweetalert";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  actualDate: string;
  constructor(
    private authService: AuthService,
    private sharedService: SharedServiceService
  ) {
    this.actualDate = new Date().toDateString();
  }

  ngOnInit() {}

  async signup(form: NgForm) {
    const {etranger,cinpassport}=form.value;
    const payload = { ...form.value,num_passport:etranger==true?cinpassport:null,cin:etranger!=true?cinpassport:null };
    try {
       await this.authService.signupEtudiant(
        payload
      ) as any;
      swal("Succès!", `un email d'activation a été envoyé pour cette adresse email ${form.value.email}`, "success");
      this.sharedService.reloadComponent();
      // this.router.navigate(['/accueil'])
    } catch (error) {
      swal("Echec!", error.error.message, "error");
      return error;
    }
  }

  getRole(event) {}
  getDepartement(event) {}
}
