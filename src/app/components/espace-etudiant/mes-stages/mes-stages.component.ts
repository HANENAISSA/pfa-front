import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../../services/shared-service.service';
import { StagiairesService } from '../../../services/stagiaires.service';

@Component({
  selector: 'app-mes-stages',
  templateUrl: './mes-stages.component.html',
  styleUrls: ['./mes-stages.component.scss']
})
export class MesStagesComponent implements OnInit {

  listEntreprises: any[] = [null];
  searchText;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private stagiairesService: StagiairesService,
    public sharedService: SharedServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMeStages();
  }
  async getMeStages() {
    try {
      const { err, rows } =
        ((await this.stagiairesService.getMeStages()) as any) || [];
      if (!err) {
        this.listEntreprises = rows;
      }
    } catch (error) {
      this.listEntreprises = [];
    }
  }
  consulterProfil(crypted_user: string) {
    this.router.navigate(["/etudiant/entreprise/profil", crypted_user]);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

}
