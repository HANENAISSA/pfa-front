import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import swal from "sweetalert";
import { SharedServiceService } from "../../../services/shared-service.service";
import { NgForm } from "@angular/forms";
import { EntrepriseServiceService } from "../../../services/entreprise-service.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
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
export class ProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = "icofont-edit";

  editAbout = true;
  editAboutIcon = "icofont-edit";

  profitChartOption: any;
  profil;
  actualDate: string;

  actifTabid: number;

  constructor(
    public sharedService: SharedServiceService,
    private profilRespService: EntrepriseServiceService
  ) {}

  ngOnInit() {
    this.getEntrepriseInfo();
  }

  toggleEditProfile(cancel?: boolean) {
    this.editProfileIcon =
      this.editProfileIcon === "icofont-close"
        ? "icofont-edit"
        : "icofont-close";
    this.editProfile = !this.editProfile;
    if (cancel) this.sharedService.reloadComponent();
  }

  toggleEditAbout() {
    this.editAboutIcon =
      this.editAboutIcon === "icofont-close" ? "icofont-edit" : "icofont-close";
    this.editAbout = !this.editAbout;
  }

  async changephoto(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (file.type.split("/")[0] === "image") {
        try {
          const formData = new FormData();
          formData.append("photo", file);
          ((await this.profilRespService.changeEntreprisephoto(
            formData
          )) as any) || [];
          this.sharedService.reloadComponent();
        } catch (error) {
          swal("Echec!", error.error.message, "warning");
        }
      } else {
        swal("Info!", "choisir une image ! ", "info");
      }
    }
  }

  async submit(form: NgForm, who: string) {
    let entreprise = null;
    let responsable = null;
    switch (who) {
      case "entreprise":
        const {
          libelle_domaine,
          localisation,
          nom_entreprise,
          num_reg_commerce,
          site_web,
        } = form.value;
        entreprise = {
          libelle_domaine,
          localisation,
          nom_entreprise,
          num_reg_commerce,
          site_web,
        };
        break;
      case "responsable":
        const { nom, prenom, email, num_tel, date_naissance } = form.value;
        responsable = { nom, prenom, email, num_tel, date_naissance };
        break;
    }
    try {
      if (responsable) {
        await this.profilRespService.update(responsable, "entreprise/profil/responsable");
      } else if (entreprise) {
        await this.profilRespService.update(
          entreprise,
          "entreprise/profil"
        );
      }
      this.sharedService.reloadComponent();
      swal("Succès!", "Opération effectuée avec succès", "success");
    } catch (error) {
      swal("Echec!", error.error.message, "warning");
    }
  }

  async getEntrepriseInfo() {
    try {
      const { err, rows } =
        ((await this.profilRespService.getEntrpriseInfo()) as any) || [];
      if (!err) {
        this.profil = rows[0];
      }
    } catch (error) {}
  }

  getLocalisation() {
    return [
      "BEN AROUS",
      "TUNIS",
      "MONASTIR",
      "ARIANA",
      "NABEUL",
      "SOUSSE",
      "GAFSA",
      "SIDI BOUZID",
    ];
  }
}
