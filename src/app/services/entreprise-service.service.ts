import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {

  constructor(private httpC:HttpClient) {

  }

    getEntrpriseInfo()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/entreprise/getEntrepriseInfo`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }
  changeEntreprisephoto(photo:FormData)
  {
    return new Promise((resolve, reject) => {
      this.httpC.put(`${environment.api}/entreprise/profil/photo`,photo)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  update(object,endpoint:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.put(`${environment.api}/${endpoint}`,object)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  // updateResposnableEntreprise(resposnable)
  // {
  //   return new Promise((resolve, reject) => {
  //     this.httpC.put(`${environment.api}/entreprise/profil/responsable`,resposnable)
  //       .forEach(data =>
  //         {
  //           resolve(data)
  //         }
  //       ).catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }

}
