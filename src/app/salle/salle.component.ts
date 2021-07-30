import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import swal from 'sweetalert2';

declare var $;
@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit {
  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  salle;

  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router) {  this.toastyConfig.theme = 'bootstrap';

    (<any>$('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });}

  ngOnInit() {
    this.salle = [];
    this.salle = this.getSalle();
    this.chRef.detectChanges();
    //  jQuery DataTables :
    const table: any = $('#dtBasicExample');
    this.dataTable = table.DataTable();
    $('.dataTables_length').addClass('bs-select');
    
  }
  getSalle() {
    return [{
      'id': '1', 'userId':
        '2', 'id_salle_de_sport': '2', 'description': 'top', 'adresse': 'tun', 'nom': 'california gym'
    },
    {
      'id': '2', 'userId':
        '3', 'id_salle_de_sport': '3', 'description': 'top', 'adresse': 'tun', 'nom': 'california gym'
    },
    {
      'id': '3', 'userId':
        '4', 'id_salle_de_sport': '4', 'description': 'top', 'adresse': 'tun', 'nom': 'california gym'
    },];
  }
  openSuccessCancelSwal(i) {
    console.log(i);
   
    swal({
      title:
        '  Êtes-vous sûr de vouloir supprimer le collaborateur   ' + this.salle[i].nom + ' ?',
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
        swal('Supprimé!', 'Votre collaborateur a été supprimé(e).', 'success');
        this.addToast('Starting VM instance in progress', '', 'success');

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


  ajouterNutritionniste(form: NgForm) {
    this.addToast('Votre nouveau nutritionniste a été ajouté avec succes ', '', 'success');

  }
  editNutritionniste(form :NgForm){
    this.addToast('Votre  nutritionniste a été modifié avec succes ', '', 'success');

  }
}
