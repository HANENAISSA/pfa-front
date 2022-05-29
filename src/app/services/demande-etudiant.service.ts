import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeEtudiant } from '../models/demande-etudiant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeEtudiantService {

  constructor(private httpC: HttpClient) { }

  addDemande(demande : DemandeEtudiant){
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/demande/etudiant/stage/entreprise/add`, demande)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  getListDemande(etatDemande:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/demande/etudiant/stage/entreprise/get/all/demandes/etudiant/${etatDemande}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }


  decideDemande(id_demande_stage:string,etat_demande:string='4')
  {
    return new Promise((resolve, reject) => {
      this.httpC.put(`${environment.api}/demande/etudiant/stage/entreprise/decision/${id_demande_stage}/${etat_demande}`,null)
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
