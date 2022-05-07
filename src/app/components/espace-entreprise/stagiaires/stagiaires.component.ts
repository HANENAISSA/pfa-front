import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
}
