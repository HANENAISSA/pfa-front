export class Competence {
  id_competence?:string;
  	libelle:string;
    	niveau:string;
    	id_cv:string;


  constructor(	libelle:string,	niveau:string,id_cv:string,id_competence?:string){
    this.libelle = libelle;
    this.niveau = niveau;
    this.id_cv=id_cv;
    this.id_competence = id_competence;
  }
}
