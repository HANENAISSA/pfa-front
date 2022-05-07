import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatureEtudiantService {

  constructor(private httpC: HttpClient) { }

  getListCandidature(etat:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/demandeEntreprise/getAllDemandesEntreprise/${etat}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }


  sendMail(payload)
  {
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/confirmationDemande/sendMail`,payload)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }

  updateCandidatureVue(id:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.patch(`${environment.api}/demandeEntreprise/updateVueDemande`,{id_demande:id})
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }


  updateCandidatResEntretien(id_demande:string,etat:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.patch(`${environment.api}/demandeEntreprise/updateEtatEntretien`,{id_etat_entretien_stage_pfe:etat,id_demande_stage_entreprise:id_demande})
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }
//   {
//     "receivers":"youssefbenmiled40@gmail.com,barhoumsouidene@gmail.com",
//     "subject":"DEMANDE DE STAGE",
//     "text":"text",
//     "etat":"1",
//     "id_demande":"1"
//  }

}
