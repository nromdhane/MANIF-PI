import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import swal from 'sweetalert2';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { Subject } from 'rxjs';

declare var $;

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  specialites;
  public configOpenRightBar: string;
  
  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router,private specialiteService: SpecialiteService) {  this.toastyConfig.theme = 'bootstrap';

    (<any>$('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });}


  ngOnInit() {
    this.specialites = [];
    this.specialiteService.getSpecialites().subscribe(data => {
      console.log((Object.values(data)[3]));
      this.specialites = (Object.values(data)[3]);
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
        '  Êtes-vous sûr de vouloir supprimer la specialite   ' + this.specialites[i].nom + ' ?',
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
        this.specialiteService.removeSpecialite(this.specialites[i].id).subscribe(data => {
          console.log(data);
          /* const found = this.coachs.find(function(element) {
             return element.id === this.coachs[i].id;
           });
           const index = this.coachs.indexOf(found);*/
          swal('Supprimé!', 'Votre specialite a été supprimé(e).', 'success');
          this.ngOnInit();
          // this.coachs.splice(index, 1);

        }, error => console.error());

      } else if (result.dismiss) {
        swal('Annulé', 'Votre Specialite est securisé(e) :)', 'error');
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


  ajouterSpecialite(form: NgForm) {
    const nom = form.value['nom'];
    const type = form.value['type'];
    // const coach = form.value['coach'];
    const coach = [];

    
    console.log(nom + type);
    this.specialiteService.addSpecialite(nom, type, coach).subscribe(data => {
      console.log(data);
      this.addToast('Votre nouvelle specialite a été ajouté avec succes ', '', 'success');
      this.ngOnInit();

    }, error => console.log(error));
  }
  

  editSpecialite(form :NgForm,i){
    console.log(i);
    const id = this.specialites[i].id;
    const type = form.value['type'];
    console.log(id + 'iiiiiidddd');
    this.specialiteService.editSpecialite(type, this.specialites[i].id).subscribe(data => {
      console.log(data);
      this.addToast('Votre specialite a été modifié avec succes ', '', 'success');
      this.ngOnInit();
    
    }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }
}