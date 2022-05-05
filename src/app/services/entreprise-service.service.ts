import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {

  constructor(private httpC:HttpClient) {

  }

  // addEntreprise(entreprise : Entreprise){
  //   let param1= new HttpParams;
  //   param1=param1.set('id_entreprise',entreprise.id_entreprise.toString()) ;
  //   param1=param1.set('nom_societe',entreprise.nom_societe.toString()) ;
  //   param1=param1.set('num_reg_commerce',entreprise.num_reg_commerce.toString()) ;
  //   param1=param1.set('localisation',entreprise.localisation.toString()) ;
  //   param1=param1.set('site_web',entreprise.site_web.toString()) ;
  //   param1=param1.set('id_domaine',entreprise.id_domaine.toString()) ;

  //   return this.httpC.post('put link add entreprise here',param1)
  // }

  // updateEntreprise(){
  //     // update domaine here
  // }

  // deleteEntreprise(){
  //     // delete domaine here
  // }

  // getOneEntreprise(id_entreprise: number)
  // {
  //   let param1= new HttpParams;
  //   param1=param1.set('id_entreprise',id_entreprise.toString()) ;
  //   let req;
  //   req={
  //     params:param1
  //   }
  //   return this.httpC.get('put link get one entreprise here',req);

  // }

  // getAllEntreprises()
  // {
  //   return this.httpC.get('put link get all entreprises here');
  // }


  getEntrpriseInfo(id_responsable:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/entreprise/getEntrepriseInfo/${id_responsable}`)
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
