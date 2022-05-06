import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import {  ActivatedRoute, Router } from "@angular/router";
import { DemandeStageEntreprise } from "../../../models/demande-stage-entreprise";
import { FormulaireCvServiceService } from "../../../services/formulaire-cv-service.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExperienceService } from "../../../services/experience.service";
import { CompetenceService } from "../../../services/competence.service";
import { PopupExperienceComponent } from "../../popups/popup-experience/popup-experience.component";
import { OffreStageServiceService } from "../../../services/offre-stage-service.service";
import { Competence } from "../../../models/competence";
import { Experience } from "../../../models/experience";
import { PopupCompetenceComponent } from "../../popups/popup-competence/popup-competence.component";
import { ChercherProfilService } from "../../../services/chercher-profil.service";
import { NgForm } from "@angular/forms";

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
  idEtudiant: string;

  editProfile = true;
  editProfileIcon = "icofont-edit";

  editAbout = true;
  editAboutIcon = "icofont-edit";

  public basicContent: string;

  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  profitChartOption: any;
  listCompetence: Competence[] = [];
  listExperience: Experience[] = [];
  profil;
  actualDate:string;

  actifTabid : number

  constructor(
    private offreStageServ: OffreStageServiceService,
    private formCvServ: FormulaireCvServiceService,
    public sharedService: SharedServiceService,
    private modalService: NgbModal,
    private serviceExperience: ExperienceService,
    private servicecompetence: CompetenceService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private profilService:ChercherProfilService
  ) {
    this.actualDate=new Date().toDateString()
  }

  ngOnInit() {
    this.getEtudiantInfo();
    this.getListCompetence();
    this.getListExperience();
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



  async getListExperience() {
    try {
      const { err, rows } =
        ((await this.serviceExperience.getExperience() as any) || []);
      if (!err) {
        this.listExperience = rows;
      }
    } catch (error) {
      return error;
    }
  }
  async getListCompetence() {
    try {
      const { err, rows } =
        ((await this.servicecompetence.getListCompetence()) as any) || [];
      if (!err) {
        this.listCompetence = rows;
      }
    } catch (error) {
      return error;
    }
  }
  async getEtudiantInfo() {
    try {
      const { err, rows } =
        ((await this.profilService.getEtudiantInfo()) as any) || [];
      if (!err) {
        this.profil = rows[0];
        console.log(this.profil);


      }
    } catch (error) {
      return error;
    }  }

  addExperience() {
    const modalRef = this.modalService.open(PopupExperienceComponent);
    modalRef.componentInstance.title = `NOUVELLE EXPERIENCE`;
  }

  addComptence() {
    const modalRef = this.modalService.open(PopupCompetenceComponent);
    modalRef.componentInstance.title = `NOUVELLE COMPETENCE`;
    modalRef.componentInstance.show = true;
  }

  openUpdateComp(item)
  {
    const modalRef = this.modalService.open(PopupCompetenceComponent);
    modalRef.componentInstance.title = `MODIFICATION COMPETENCE`;
    modalRef.componentInstance.details = {...item};
    modalRef.componentInstance.edit = true;

  }
  openDeleteComp(id:string)
  {
      const modalRef = this.modalService.open(PopupCompetenceComponent);
      modalRef.componentInstance.title = `SUPPRESSION COMPETENCE`;
      modalRef.componentInstance.id_com = id;
  }

  openUpdateExper(item){
    const modalRef = this.modalService.open(PopupExperienceComponent);
    modalRef.componentInstance.title = `MODIFICATION EXPERIENCE`;
    modalRef.componentInstance.details = {...item};
    modalRef.componentInstance.edit = true;
  }

  openDeleteExper(id: string){
    const modalRef = this.modalService.open(PopupExperienceComponent);
    modalRef.componentInstance.title = `SUPPRESSION EXPERIENCE`;
    modalRef.componentInstance.id_exp = id;
  }

  changephoto(event){
    console.log(event);

  }
  changecv(event){

  }

  submit(form:NgForm){
    console.log(form);

  }
}
