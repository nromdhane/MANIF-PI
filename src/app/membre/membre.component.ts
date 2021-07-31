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
import { MembreService } from 'src/app/services/membre.service';
import { Subject } from 'rxjs';

declare var $;

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.scss']
})
export class MembreComponent implements OnInit {

@ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  membres;
  re = /^[^\s@]+@[^\s@]+$/;



  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router, private membreService: MembreService


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
    this.membres = [];

    this.membreService.getMembres().subscribe(data => {
      console.log((Object.values(data)[3]));
      this.membres = (Object.values(data)[3]);
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
    swal({
      title:
        '  Êtes-vous sûr de vouloir supprimer le collaborateur   ' + this.membres[i].nom + ' ?',
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
        this.membreService.removeMembre(this.membres[i].id).subscribe(data => {
          console.log(data);
          /* const found = this.membres.find(function(element) {
             return element.id === this.membres[i].id;
           });
           const index = this.membres.indexOf(found);*/
          swal('Supprimé!', 'Votre collaborateur a été supprimé(e).', 'success');
           this.membres.splice(i, 1);

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


  addMembre(form: NgForm) {
   
    const nom = form.value['nom'];
    const taille = form.value['Taille'];
    const poids = form.value['Poids'];
    const dateDeNaissance = form.value['dateDeNaissance'];
    console.log(form);
    this.membreService.addMembre(dateDeNaissance,poids,taille,nom,).subscribe(data => {
      console.log(data);
      this.membres.push(data);
      this.addToast('Votre nouveau membre a été ajouté avec succes ', '', 'success');

    }, error => console.log(error));

  }
  editMembre(form: NgForm, i) {
    console.log(form);
    const id = this.membres[i].id;
    const nom = form.value['nom'];
    const taille = form.value['Taille'];
    const poids = form.value['Poids'];
    const dateDeNaissance = form.value['dateDeNaissance'];
    console.log(id);
    this.membreService.editMembre( dateDeNaissance,poids,taille, nom,this.membres[i].id).subscribe(data => {
      console.log(data);
      this.addToast('Votre  membre a été modifié avec succes ', '', 'success');
      this.chRef.detectChanges();
    }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }

}
