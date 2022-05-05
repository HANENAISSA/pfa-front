import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomaineServiceService {

  constructor(private httpC:HttpClient) { }

  // addDomaine(domaine : Domaine){
  //   let param1= new HttpParams;
  //   param1=param1.set('libelle',domaine.libelle.toString()) ;

  //   return this.httpC.post('put link add here',param1)
  // }

  // updateDomaine(){
  //     // update domaine here
  // }

  // deleteDomaine(){
  //     // delete domaine here
  // }

  // getOneDomaine(id_domaine: number)
  // {
  //   let param1= new HttpParams;
  //   param1=param1.set('id_domaine',id_domaine.toString()) ;
  //   let req;
  //   req={
  //     params:param1
  //   }
  //   return this.httpC.get('put link get one domaine here',req);

  // }

  getAllDomaines()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/domaine/getAll`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }
}
