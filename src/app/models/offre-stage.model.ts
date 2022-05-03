export class OffreStage {

  id_offre_stage: number;
  titre:string;
  type: string;
  duree: string;
  date_debut: string;
  date_fin: string;
  etat : number;
  cahier_charge: string;
  id_enterepise: string;
  description:string
  nbr_vue : number;
  nbr_postulation : number;

  constructor(titre:string,type:string, duree: string,	date_debut: string,	date_fin: string,
    etat: number,	cahier_charge: string,
    id_entreprise?: string,desc?:string,nb_vue?:number,nb_postulations?:number){
    this.titre = titre;
    this.type = type;
    this.duree = duree;
    this.date_debut = date_debut;
    this.date_fin = date_fin;
    this.etat = etat;
    this.cahier_charge = cahier_charge;
    this.id_enterepise = id_entreprise;
    this.description = desc;
    this.nbr_vue = nb_vue;
    this.nbr_postulation = nb_postulations;
  }
}
