export class Experience {
  id_experience? :string ;
  	nom_entreprise:string ;
    	date_debut:string ;
      	date_fin:string ;
        description:string ;
        	post:string ;
          id_cv:string;
  constructor(	nom_entreprise:string,	date_debut:string,id_cv,
    	date_fin:string,	description:string,	post:string,id_experience ?:string,){
   this.id_experience=id_experience;
   this.nom_entreprise=nom_entreprise;
   this.date_debut=date_debut;
   this.date_fin=date_fin;
   this.post=post;
   this.id_cv=id_cv;
   this.description=description;

  }
}
