import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  actualDate:string;
  constructor() {
    this.actualDate=new Date().toDateString()
  }

  ngOnInit() {}

  getRole(event) {}
  getDepartement(event) {}
  signup(form: NgForm) {
    console.log(form.value);
  }
}
