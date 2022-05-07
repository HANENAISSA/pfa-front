import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import swal from "sweetalert";
import { SharedServiceService } from "../../../services/shared-service.service";
import { StagiairesService } from "../../../services/stagiaires.service";

@Component({
  selector: "app-stagiaires",
  templateUrl: "./stagiaires.component.html",
  styleUrls: ["./stagiaires.component.scss"],
})
export class StagiairesComponent implements OnInit {
  listStagiaires: any[] = [null];
  searchText;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private stagiairesService: StagiairesService,
    public sharedService: SharedServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllStagiaires();
  }
  async getAllStagiaires() {
    try {
      const { err, rows } =
        ((await this.stagiairesService.getAllSatgiares()) as any) || [];
      if (!err) {
        this.listStagiaires = rows;
      }
    } catch (error) {
      this.listStagiaires = [];
    }
  }
  consulterProfil(crypted_user: string) {
    this.router.navigate(["/entreprise/etudiant/profil/", crypted_user]);
  }
supprimerStagiaire(id_demande_stage_entreprise){

  swal({
    title: "Voulez-vous supprimer le stagiaire?",
    buttons:['cancel','confirm'],
    closeOnEsc:true,
    closeOnClickOutside:true
  }).then((result) => {
    if(result){
      this.deleteStagiaire(id_demande_stage_entreprise.toString());
    }
  });
}
  async deleteStagiaire(id_demande_stage_entreprise: string) {
    try {
      const { err, rows } =
        ((await this.stagiairesService.deleteStagiaire(id_demande_stage_entreprise)) as any) || [];
      if (!err) {
        this.sharedService.reloadComponent()
        swal("Succès!", "Modification effectuée avec succès", "success");

      }
    } catch (error) {
      swal("Echec!", "Opération non effectuée", "error");
    }
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
}
