import { Injectable } from "@angular/core";
import * as moment from "moment";
import {  Router } from "@angular/router";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class SharedServiceService {
  constructor(private router: Router) {}

  formatDate(date, hour?: boolean) {
    if (date) {
      if (hour) return moment(date).format("DD/MM/YYYY HH:mm").toString();
      return moment(date).format("DD/MM/YYYY").toString();
    } else {
      return "(Date séléctionnée)";
    }
  }


  reloadComponent() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      // if (tabid && tabid != 0)
        // this.router.navigate([currentRoute+"/"+tabid]);
        // this.router.navigate(["/etudiant/profil", tabid.toString()]);
      // else
      this.router.navigate([currentRoute]);
      // navigate to same route
    });
  }


  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), "secretKey").toString();
    } catch (e) {
      return e;
    }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, "secretKey");
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return e;
    }
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(";");
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, "");
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  }

  deleteCookie(name) {
    this.setCookie(name, "", -1);
  }

  setCookie(
    name: string,
    value: string,
    expireDays: number,
    path: string = "/"
  ) {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : "";
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  getLocalisation() {
    return [
      "ARIANA",
      "BEN AROUS",
      "BEJA",
      "Bizerte",
      "GAFSA",
      "Gabes",
      "Jendouba",
      "Kairouan",
      "Kebili",
      "Kef",
      "Mahdia",
      "MANOUBA",
      "MONASTIR",
      "MEDNINE",
      "NABEUL",
      "SOUSSE",
      "SIDI BOUZID",
      "SFAX",
      "SILIANA",
      "TATAOUINE",
      "TOZEUR",
      "TUNIS",
      "ZAGHOUAN",
    ];
  }
}
