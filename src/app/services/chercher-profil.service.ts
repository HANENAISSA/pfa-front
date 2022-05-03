import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChercherProfilService {

  constructor(private httpC: HttpClient) { }

  getListEtudiant()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`http://localhost:5010/etudiantComp/getAll`)
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
      this.httpC.get(`http://localhost:5010/etudiantComp/getCompetenceByEtudiant/${id_etudiant}}`)
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
      this.httpC.get(`http://localhost:5010/etudiantComp/getDepartementsList`)
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
      this.httpC.get(`http://localhost:5010/etudiantComp/getFilteredStudents/${id}`)
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
      this.httpC.post('http://localhost:5010/confirmationDemande/contactStudent', mailPayload)
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
      this.httpC.get(`http://localhost:5010/etudiantComp/getContactedStudents/${id_responsable}`)
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
      this.httpC.get(`http://localhost:5010/etudiantComp/getFilteredStudentsContacte/${id}/${id_resposable}`)
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
      this.httpC.post(`http://localhost:5010/etudiantComp/getAllEtudiantsByCompetences`,payload)
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
    this.httpC.post(`http://localhost:5010/etudiantComp/getAllEtudiantsContactesByCompetences`,{"competencesList":payload})
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
