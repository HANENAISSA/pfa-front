import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { SharedServiceService } from "../../../services/shared-service.service";
import { ChercherProfilService } from "../../../services/chercher-profil.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-visit-profil-etudiant",
  templateUrl: "./visit-profil-etudiant.component.html",
  styleUrls: ["./visit-profil-etudiant.component.scss"],
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class VisitProfilEtudiantComponent implements OnInit {
  editProfile = true;
  editProfileIcon = "icofont-edit";

  editAbout = true;
  editAboutIcon = "icofont-edit";

  profil;
  list: any[] = [];
  id_profil: string;

  constructor(
    public sharedService: SharedServiceService,
    private profilService: ChercherProfilService,
    private actifRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.load_id_profil();
    this.getEtudiantProfil();
  }

  toggleEditProfile() {
    this.editProfileIcon =
      this.editProfileIcon === "icofont-close"
        ? "icofont-edit"
        : "icofont-close";
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon =
      this.editAboutIcon === "icofont-close" ? "icofont-edit" : "icofont-close";
    this.editAbout = !this.editAbout;
  }
  async getEtudiantProfil(tabId: string = "0") {
    try {
      const { rows } =
        ((await this.profilService.getEtudiantProfil(
          this.id_profil,
          tabId
        )) as any) || [];

      if (tabId=='0') this.profil = rows[0];
      else this.list = rows;
    } catch (error) {
      // const { err, rows } = error.error;
      // if (!err && rows && rows.length == 0) {
      //   this.router.navigate(["/introuvable"]);
      // }
    }
  }
  changeTabset(event) {
    this.list = [null];
    const tabId = event.nextId.toString();
    this.getEtudiantProfil(tabId);
  }

  load_id_profil() {
    this.actifRoute.params.subscribe((res) => {
      this.id_profil = res.id;
    });
  }
}
