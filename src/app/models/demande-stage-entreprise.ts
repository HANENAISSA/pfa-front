export class DemandeStageEntreprise {

  id_demande_stage_entreprise?: string;
  id_etudiant	:string;
  id_offre_stage: string ;

  constructor(id_etudiant	: string, id_offre_stage : string, id_demande_stage_entreprise?: string){
    this.id_demande_stage_entreprise = id_demande_stage_entreprise;
    this.id_etudiant = id_etudiant;
    this.id_offre_stage = id_offre_stage;
  }
}
