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
import { NutritionnisteService } from 'src/app/services/nutritionniste.service';
import { Subject } from 'rxjs';

declare var $;

@Component({
  selector: 'app-nutritionniste',
  templateUrl: './nutritionniste.component.html',
  styleUrls: ['./nutritionniste.component.scss']
})
export class NutritionnisteComponent implements OnInit {
  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  nutritionnistes;
  re = /^[^\s@]+@[^\s@]+$/;



  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router, private nutritionnisteService: NutritionnisteService


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
    this.nutritionnistes = [];
    this.getAllNutritionnistes();
  }

  getAllNutritionnistes() {
    this.nutritionnisteService.getNutritionnistes().subscribe(data => {
      console.log((Object.values(data)[3]));
      this.nutritionnistes = (Object.values(data)[3]);
      this.chRef.detectChanges();
      //  jQuery DataTables :
      const table: any = $('#dtBasicExample');
      this.dataTable = table.DataTable();
      $('.dataTables_length').addClass('bs-select');
    },
      error => { console.log('failed'+ error); });

  }

  openSuccessCancelSwal(i) {
    console.log(i);
    swal({
      title:
        '  Êtes-vous sûr de vouloir supprimer le collaborateur   ' + this.nutritionnistes[i].prenom + ' ' + this.nutritionnistes[i].nom + ' ?',
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
        this.nutritionnisteService.removeNutritionniste(this.nutritionnistes[i].id).subscribe(data => {
          this.getAllNutritionnistes();
          console.log(data);
          /* const found = this.nutritionnistes.find(function(element) {
             return element.id === this.nutritionnistes[i].id;
           });
           const index = this.nutritionnistes.indexOf(found);*/
          swal('Supprimé!', 'Votre collaborateur a été supprimé(e).', 'success');
          // this.nutritionnistes.splice(index, 1);

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


  ajouterNutritionniste(form: NgForm) {
    let tel = '';
    const nom = form.value['nom'];
    const prenom = form.value['prenom'];
    const email = form.value['email'];
    const disponibilite = form.value['disponibilite'];
    // const salleDeSport = form.value['salleDeSport'];
    const salleDeSport = [];

    tel = (form.value['tel']).toString();
    console.log(nom + prenom + email + disponibilite + tel);
    this.nutritionnisteService.addNutritionniste(nom, prenom, disponibilite, email, salleDeSport, tel).subscribe(data => {
      this.getAllNutritionnistes();
      console.log(data);
      this.addToast('Votre nouveau nutritionniste a été ajouté avec succes ', '', 'success');
      this.ngOnInit();

    }, error => console.log(error));

  }
  editNutritionniste(form: NgForm, i) {
    const email = form.value['email'];
    const disponibilite = form.value['disponibilite'];
    const tel = form.value['num'];
    this.nutritionnisteService.editNutritionniste(email, disponibilite, tel, this.nutritionnistes[i].id).subscribe(data => {
      this.getAllNutritionnistes();
      this.addToast('Votre  nutritionniste a été modifié avec succes ', '', 'success');
    }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }

}


