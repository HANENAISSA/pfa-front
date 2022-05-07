import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChercherProfilService {

  constructor(private httpC: HttpClient) { }

  getListEtudiant(tabId:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiant/getAll/${tabId}`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }
  getCompetenceByEtudiant(id_etudiant:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiantController/getCompetenceByEtudiant/${id_etudiant}}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }

  getDepartementsList()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiantController/getDepartementsList`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  filterEtudiants(id:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiantController/getFilteredStudents/${id}`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  contacterProfil(mailPayload){
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/confirmationDemande/contactStudent`, mailPayload)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  getToutEtudiantContacte(id_responsable:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiantController/getContactedStudents/${id_responsable}`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  filterEtudiantsContacte(id:string,id_resposable:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiantController/getFilteredStudentsContacte/${id}/${id_resposable}`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  getListEtudiantsByCompetences(payload)
  {
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/etudiantController/getAllEtudiantsByCompetences`,payload)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  getListEtudiantsContactesByCompetences(payload)
  {
    return new Promise((resolve, reject) => {
    this.httpC.post(`${environment.api}/etudiantController/getAllEtudiantsContactesByCompetences`,{"competencesList":payload})
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  getEtudiantInfo()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiant/getetudiant`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  changeEtudiantphoto(photo:FormData)
  {
    return new Promise((resolve, reject) => {
      this.httpC.put(`${environment.api}/etudiant/profil/photo`,photo)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });

  }


  getEtudiantProfil(id_profil:string,tabId:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiant/profil/${id_profil}/${tabId}`)
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
