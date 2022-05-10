import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import swal from 'sweetalert';
import { ChercherProfilService } from '../../../services/chercher-profil.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../../../services/shared-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  profitChartOption: any;
  profil;
  actualDate: string;

  actifTabid: number;

  constructor(public sharedService: SharedServiceService,
  private modalService: NgbModal,
  private profilService: ChercherProfilService
) {
  }

  ngOnInit() {
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
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
            ((await this.profilService.changeEtudiantphoto(formData)) as any) ||
            [];
          this.sharedService.reloadComponent();
        } catch (error) {
          swal("Echec!", "Réessayer plus tard ! ", "error");
        }
      } else {
        swal("Echec!", "choisir une image ! ", "error");
      }
    }
  }

  submit(form: NgForm) {
    console.log(form);
  }

}
