import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import {
  ToastData,
  ToastOptions,
  ToastyService,
  ToastyConfig
} from 'ng2-toasty';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Subject } from 'rxjs';
import { id } from '@swimlane/ngx-datatable/release/utils';

declare var $;

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

@ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  utilisateurs;
  re = /^[^\s@]+@[^\s@]+$/;



  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router, private utilisateurService: UtilisateurService


  ) {
    this.toastyConfig.theme = 'bootstrap';

    (<any>$('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });
  }

  ngOnInit() {
    this.utilisateurs = [];

    this.utilisateurService.getUtilisateurs().subscribe(data => {
      console.log((Object.values(data)[3]));
      this.utilisateurs = (Object.values(data)[3]);
      this.chRef.detectChanges();
      //  jQuery DataTables :
      const table: any = $('#dtBasicExample');
      this.dataTable = table.DataTable();
      $('.dataTables_length').addClass('bs-select');
    },
      error => { console.log('failed'); });

  }



  openSuccessCancelSwal(i) {
    console.log(i);
    console.log(this.utilisateurs[i]["@id"]);
    console.log(this.utilisateurs[i]["@id"].split("/"));
    swal({
      title:
        '  Êtes-vous sûr de vouloir supprimer le collaborateur   ' + this.utilisateurs[i]["@id"].split("/")[3]+ ' ?',
      text: 'Cette action ne peut pas être annulée !!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprime le!',
      cancelButtonText: 'non, annuler!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then(result => {
      if (result.value) {
        this.utilisateurService.removeUtilisateur(this.utilisateurs[i]["@id"]).subscribe(data => {
          /*console.log(data);
           const found = this.utilisateurs.find(function(element) {
             return element.id === this.utilisateurs[i].id;
           });
           const index = this.utilisateurs.indexOf(found);*/
           this.utilisateurs.splice(i, 1);
          swal('Supprimé!', 'Votre collaborateur a été supprimé(e).', 'success');
         

        }, error => console.error());


      } else if (result.dismiss) {
        swal('Annulé', 'Votre collaborateur est securisé(e) :)', 'error');
      }
    });
  }


  addToast(title, message, type) {
    console.log('adding toast');
    // Or create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'material',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


  ajouterUtilisateur(form: NgForm) {
    let tel = '';
    console.log(form);
    const email = form.value['email'];
    const roles = form.value['roles'];
    const password = form.value['Motdepasse'];
    const lattitide = form.value['lattitude'];
    const longitude = form.value['longitude'];
    const reset_token = form.value['reset_token'];
    console.log(email + roles + password + lattitide + longitude + reset_token);
    this.utilisateurService.addUtilisateur(email, roles, password,lattitide,longitude,reset_token).subscribe(data => {
      console.log(data);
      this.addToast('Votre nouveau utilisateur a été ajouté avec succes ', '', 'success');

    }, error => console.log(error));

  }
  editUtilisateur(form: NgForm, i) {
    console.log(this.utilisateurs[i]);
    const id = this.utilisateurs[i]["@id"];
    const email = form.value['email'];
    const roles = form.value['roles']?form.value['roles']:this.utilisateurs[i]["roles"];
    const password = form.value['Motdepasse'];
    const lattitide = form.value['lattitude'];
    const longitude = form.value['longitude'];
    const reset_token = form.value['reset_token']?form.value['reset_token']:this.utilisateurs[i]["resetToken"];
    console.log(id + 'iiiiiidddd');
    this.utilisateurService.editUtilisateur(email, roles, password,lattitide,longitude,reset_token, id).subscribe(data => {
      console.log(data);
      this.addToast('Votre  utilisateur a été modifié avec succes ', '', 'success');
      this.chRef.detectChanges();
    }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }

}
