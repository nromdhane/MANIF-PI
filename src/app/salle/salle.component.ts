import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import swal from 'sweetalert2';
import { SalleService } from 'src/app/salle.service';

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
    private toastyConfig: ToastyConfig, private router: Router, private salleService:SalleService) {  this.toastyConfig.theme = 'bootstrap';

    (<any>$('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });
  }

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
    
    this.salleService.getSalles().subscribe(data => {
      console.log((Object.values(data)[3]));
      this.salle = (Object.values(data)[3]);
      this.chRef.detectChanges();
      //  jQuery DataTables :
      const table: any = $('#dtBasicExample');
      this.dataTable = table.DataTable();
      $('.dataTables_length').addClass('bs-select');
    },
      error => { console.log('failed'+ error); }); 
  }
  openSuccessCancelSwal(i) {
    
   
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
        this.salleService.removeSalle(this.salle[i].id).subscribe(data => {
          console.log(this.salle[1].id);
          console.log(data);
          swal('Supprimé!', 'Votre Salle de sport a été supprimé(e).', 'success');
          this.ngOnInit();

        }, error => console.error());

      } else if (result.dismiss) {
        swal('Annulé', 'Votre Salle de sport est securisé(e) :)', 'error');
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


  ajouterSalle(form: NgForm) {
    const nom = form.value['nom'];
    const description = form.value['description'];
      // const specilaite = form.value['specialite'];
      //const specialite = [];
    // const activite = form.value['activite'];
    //const activite = [];
    
    
    
    this.salleService.addSalle(nom, description).subscribe(data => {
      console.log(data);
      this.addToast('Votre nouveau coach a été ajouté avec succes ', '', 'success');
      this.ngOnInit();

    }, error => console.log(error));
  }
  editSalle(form :NgForm,i){
    console.log(i);
    const id = this.salle[i].id;
    const nom = form.value['nom'];
    const description = form.value['description'];
    console.log(id + 'iiiiiidddd');
    this.salleService.editSalle(nom, description, this.salle[i].id).subscribe(data => {
      this.getSalle();
      console.log(data);
      this.addToast('Votre  salle de sport a été modifié avec succes ', '', 'success');
  
    }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }

}
