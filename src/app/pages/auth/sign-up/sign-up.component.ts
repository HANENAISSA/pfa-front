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
  htmlinputType:string;

  constructor(
    private authService: AuthService,
    private sharedService: SharedServiceService
  ) {
    this.actualDate = new Date().toDateString();
    this.htmlinputType='text';

  }

  ngOnInit() {}

  async signup(form: NgForm) {
    const {etranger,cinpassport,id_role}=form.value;
    const payload = { ...form.value,num_passport:etranger==true?cinpassport:null,cin:etranger!=true?cinpassport:null };
    delete payload['pass2'];
    if(id_role==1)delete payload['id_domaine']
    try {
       await this.authService.signup(
        payload,id_role
      ) as any;
      swal("Succès!", `un email d'activation a été envoyé à ${form.value.email} vérifier votre spam aussi !`, "success");
      this.sharedService.reloadComponent();
    } catch (error) {
      swal("Echec!", error.error.message, "error");
    }
  }

  geninputtype(){
    this.htmlinputType='date';
  }
  getLocalisation() {
    return this.sharedService.getLocalisation();
  }
}
