import { Injectable } from '@angular/core';
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private router:Router,  private httpC:HttpClient   ) { }

  formatDate(date, hour?:boolean){
    if(date)
    {
      if(hour)
      return moment(date).format('DD/MM/YYYY HH:mm').toString();
      return moment(date).format('DD/MM/YYYY').toString();
    }else{
      return '(Date séléctionnée)'
    }

  }
  formatDateUpdate(date):string{
    return moment(date).format("DD-MM-YYYY").toString();
  }



  reloadComponent(tabid?:number) {
    const currentRoute = this.router.url;

    this.router.navigateByUrl("/", { skipLocationChange: true}).then(() => {
      if(tabid&&tabid!=0)
        // this.router.navigate([currentRoute+"/"+tabid]);
        this.router.navigate(
          ['/etudiant/cv',tabid.toString()],
         );
      else
        this.router.navigate([currentRoute]);
       // navigate to same route
    });
  }

  dureeDiff = (date_debut, date_fin) => {
    if (date_fin) {
      const dd = moment(date_debut).format("MM/DD/YYYY hh:mm:ss").toString();
      const df = moment(date_fin).format("MM/DD/YYYY hh:mm:ss").toString();
      const date1 = new Date(dd) as any;
      const date2 = new Date(df) as any;
      const Difference_In_Time = date2.getTime() - date1.getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return Math.floor(Difference_In_Days);
    }
  };

  getYears(yearsType:number){
    let path:string=``;
    switch (yearsType) {
      case 0:
        path=`http://localhost:5010/offrestage/getOffresYears`;
        break;
      case 1:
        path=`http://localhost:5010/demandeEtudiantStageEntreprise/getAllDemandesYears`;
        break;

      default:
        path=null;
        break;
    }

    return new Promise((resolve, reject) => {
      this.httpC.get(path)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
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

}
