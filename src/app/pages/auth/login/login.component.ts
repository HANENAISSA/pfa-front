import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async login(form:NgForm){
    const payload = { ...form.value};
    try {
       const {err,id_role,token}=await this.authService.login(
        payload
      ) as any;
      if(!err){
        console.log(id_role,token);
      }
    } catch (error) {
      swal("Echec!", error.error.message, "error");
      return error;
    }


  }
}
