import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChercherProfilService {

  constructor(private httpC: HttpClient) { }

  getListEtudiant()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/etudiantComp/getAll`)
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
      this.httpC.get(`${environment.api}/etudiantComp/getCompetenceByEtudiant/${id_etudiant}}`)
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
      this.httpC.get(`${environment.api}/etudiantComp/getDepartementsList`)
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
      this.httpC.get(`${environment.api}/etudiantComp/getFilteredStudents/${id}`)
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
      this.httpC.post('${environment.api}/confirmationDemande/contactStudent', mailPayload)
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
      this.httpC.get(`${environment.api}/etudiantComp/getContactedStudents/${id_responsable}`)
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
      this.httpC.get(`${environment.api}/etudiantComp/getFilteredStudentsContacte/${id}/${id_resposable}`)
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
      this.httpC.post(`${environment.api}/etudiantComp/getAllEtudiantsByCompetences`,payload)
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
    this.httpC.post(`${environment.api}/etudiantComp/getAllEtudiantsContactesByCompetences`,{"competencesList":payload})
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
