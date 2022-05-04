import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatureEtudiantService {

  constructor(private httpC: HttpClient) { }

  getListCandidature(id_responsable:string,etat:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`http://localhost:5010/demandeEntreprise/getAllDemandesEntreprise/${id_responsable}/${etat}`)
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
      this.httpC.post(`http://localhost:5010/confirmationDemande/sendMail`,payload)
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
      this.httpC.patch(`http://localhost:5010/demandeEntreprise/updateVueDemande`,{id_demande:id})
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
      this.httpC.patch(`http://localhost:5010/demandeEntreprise/updateEtatEntretien`,{id_etat_entretien_stage_pfe:etat,id_demande_stage_entreprise:id_demande})
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
