import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EntrepriseServiceService } from "../../../services/entreprise-service.service";

@Component({
  selector: "app-visit-profil-responsable",
  templateUrl: "./visit-profil-responsable.component.html",
  styleUrls: ["./visit-profil-responsable.component.scss"],
})
export class VisitProfilResponsableComponent implements OnInit {
  profil: any;
  id_profil: string;
  constructor(
    private entrepriseService: EntrepriseServiceService,
    private actifRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.load_id_profil();
    this.getEntrpriseProfile();
  }

  async getEntrpriseProfile() {
    try {
      const { rows } =
        ((await this.entrepriseService.getEntrpriseProfile(this.id_profil)) as any) || [];
       this.profil = rows[0];
    } catch (error) {
      const { err, rows } = error.error;
      if (!err && rows && rows.length == 0) {
        this.router.navigate(["/introuvable"]);
      }
    }
  }

  load_id_profil() {
    this.actifRoute.params.subscribe((res) => {
      this.id_profil = res.id;
    });
  }
}
