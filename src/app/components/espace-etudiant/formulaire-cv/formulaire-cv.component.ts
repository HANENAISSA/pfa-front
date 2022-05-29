import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { SharedServiceService } from "../../../services/shared-service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExperienceService } from "../../../services/experience.service";
import { CompetenceService } from "../../../services/competence.service";
import { PopupExperienceComponent } from "../../popups/popup-experience/popup-experience.component";
import { Competence } from "../../../models/competence";
import { Experience } from "../../../models/experience";
import { PopupCompetenceComponent } from "../../popups/popup-competence/popup-competence.component";
import { ChercherProfilService } from "../../../services/chercher-profil.service";
import { NgForm } from "@angular/forms";
import swal from "sweetalert";
import { EtudiantService } from "../../../../app/services/etudiant.service";

@Component({
  selector: "app-formulaire-cv",
  templateUrl: "./formulaire-cv.component.html",
  styleUrls: ["./formulaire-cv.component.scss"],
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
export class FormulaireCvComponent implements OnInit {
  editProfile = true;
  editProfileIcon = "icofont-edit";

  editAbout = true;
  editAboutIcon = "icofont-edit";

  listCompetence: Competence[] = [];
  listExperience: Experience[] = [];
  profil;
  actualDate: string;

  actifTabid: number;
  formData: FormData;

  constructor(
    public sharedService: SharedServiceService,
    private modalService: NgbModal,
    private serviceExperience: ExperienceService,
    private servicecompetence: CompetenceService,
    private profilService: ChercherProfilService,
    private etudiantService: EtudiantService
  ) {
    this.actualDate = new Date().toDateString();
    this.formData = new FormData();
  }

  ngOnInit() {
    this.getEtudiantInfo();
    this.getListCompetence();
    this.getListExperience();
  }

  toggleEditProfile(cancel?:boolean) {
    this.editProfileIcon =
      this.editProfileIcon === "icofont-close"
        ? "icofont-edit"
        : "icofont-close";
    this.editProfile = !this.editProfile;
    if(cancel)
    this.sharedService.reloadComponent();
  }

  toggleEditAbout() {
    this.editAboutIcon =
      this.editAboutIcon === "icofont-close" ? "icofont-edit" : "icofont-close";
    this.editAbout = !this.editAbout;
  }

  async getListExperience() {
    try {
      const { err, rows } =
        ((await this.serviceExperience.getExperience()) as any) || [];
      if (!err) {
        this.listExperience = rows;
      }
    } catch (error) {}
  }
  async getListCompetence() {
    try {
      const { err, rows } =
        ((await this.servicecompetence.getListCompetence()) as any) || [];
      if (!err) {
        this.listCompetence = rows;
      }
    } catch (error) {}
  }
  async getEtudiantInfo() {
    try {
      const { err, rows } =
        ((await this.profilService.getEtudiantInfo()) as any) || [];
      if (!err) {
        this.profil = rows[0];
      }
    } catch (error) {}
  }

  addExperience() {
    const modalRef = this.modalService.open(PopupExperienceComponent);
    modalRef.componentInstance.title = `NOUVELLE EXPERIENCE`;
  }

  addComptence() {
    const modalRef = this.modalService.open(PopupCompetenceComponent);
    modalRef.componentInstance.title = `NOUVELLE COMPETENCE`;
  }

  openUpdateComp(item) {
    const modalRef = this.modalService.open(PopupCompetenceComponent);
    modalRef.componentInstance.title = `MODIFICATION COMPETENCE`;
    modalRef.componentInstance.details = { ...item };
    modalRef.componentInstance.edit = true;
  }

  openDeleteComp(id_competence: string) {
    swal({
      title: "Voulez-vous supprimer la compétence?",
      buttons: ["cancel", "confirm"],
      closeOnEsc: true,
      closeOnClickOutside: true,
    }).then((result) => {
      if (result) {
        this.deleteComp(id_competence);
      }
    });
  }

  openUpdateExper(item) {
    const modalRef = this.modalService.open(PopupExperienceComponent);
    modalRef.componentInstance.title = `MODIFICATION EXPERIENCE`;
    modalRef.componentInstance.details = { ...item };
    modalRef.componentInstance.edit = true;
  }

  openDeleteExper(id_experience: string) {
    swal({
      title: "Voulez-vous supprimer l'expérience ?",
      buttons: ["cancel", "confirm"],
      closeOnEsc: true,
      closeOnClickOutside: true,
    }).then((result) => {
      if (result) {
        this.deleteExperience(id_experience);
      }
    });
  }

  async changephoto(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (file.type.split("/")[0] === "image") {
        try {
          const formData = new FormData();
          formData.append("photo", file);
          ((await this.profilService.changeEtudiantphoto(formData)) as any) ||
            [];
          this.sharedService.reloadComponent();
        } catch (error) {
          swal("Echec!", error.error.message, "warning");
        }
      } else {
        swal("info!", "choisir une image ! ", "info");
      }
    }
  }
  changecv(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (file.type.split("/")[0] === "image") {
        this.formData.append("fichier_cv", file);
      } else {
        swal("info!", "choisir une image ! ", "info");
      }
    }
  }

  async submit(form: NgForm) {
    const {
      nom,
      prenom,
      date_naissance,
      identite,
      num_tel,
      email,
      id_departement,
      cv,
    } = form.value;
    const etudiant = {
      nom,
      prenom,
      date_naissance,
      cin: this.profil.cin ? identite : null,
      num_passport: this.profil.num_passport ? identite : null,
      num_tel,
      email,
      id_departement,
    };
    try {
      const { err } = (await this.etudiantService.updateEtudiant(
        cv ? this.getFormData(etudiant) : etudiant
      )) as any;
      if (!err) {
        this.sharedService.reloadComponent();
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", error.error.message, "warning");
    }
  }
  getFormData(etudiant) {
    this.formData.append("nom", etudiant.nom);
    this.formData.append("prenom", etudiant.prenom);
    this.formData.append("email", etudiant.email);
    this.formData.append("date_naissance", etudiant.date_naissance);
    this.formData.append("num_tel", etudiant.num_tel);
    this.formData.append(
      `${this.profil.cin ? "cin" : "num_passport"}`,
      etudiant.identite
    );
    this.formData.append("id_departement", etudiant.id_departement);
    return this.formData;
  }
  async deleteComp(id_competence: string) {
    try {
      const { err } = (await this.servicecompetence.deleteCompetence(
        id_competence
      )) as any;
      if (!err) {
        this.sharedService.reloadComponent();
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", error.error.message, "warning");
    }
  }
  async deleteExperience(id_experience: string) {
    try {
      const { err } = (await this.serviceExperience.deleteExperience(
        id_experience
      )) as any;
      if (!err) {
        this.sharedService.reloadComponent();
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", error.error.message, "warning");
    }
  }
  deletecv() {
    swal({
      title: "Voulez-vous supprimer le cv?",
      buttons: ["cancel", "confirm"],
      closeOnEsc: true,
      closeOnClickOutside: true,
    }).then(async (result) => {
      if (result) {
        try {
          const { err } = (await this.etudiantService.delCvEtudiant()) as any;
          if (!err) {
            this.sharedService.reloadComponent();
            swal("Succés!", "cv supprimé !", "success");
          }
        } catch (error) {
          swal("Echec!", error.error.message, "warning");
        }
      }
    });
  }
}
