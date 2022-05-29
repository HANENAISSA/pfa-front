import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EntrepriseServiceService } from "../../../services/entreprise-service.service";

@Component({
  selector: "app-filter-entreprise",
  templateUrl: "./filter-entreprise.component.html",
  styleUrls: ["./filter-entreprise.component.scss"],
})
export class FilterEntrepriseComponent implements OnInit {
  listEntreprises: any[] = [null];
  searchText;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  constructor(
    private router: Router,
    private entrepriseService: EntrepriseServiceService
  ) {}

  ngOnInit() {
    this.getAllEntreprises();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  consulterProfil(crypted_user: string) {
    this.router.navigate(["/etudiant/entreprise/profil", crypted_user]);
  }

  async getAllEntreprises() {
    try {
      const { err, rows } =
        ((await this.entrepriseService.getAllEntrprises()) as any) || [];
      if (!err) {
        this.listEntreprises = rows;
      }
    } catch (error) {
      this.listEntreprises = [];
    }
  }
}
