import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import swal from 'sweetalert2';
import { CoachService } from 'src/app/services/coach.service';
import { Subject } from 'rxjs';

declare var $;

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  coachs;
  re = /^[^\s@]+@[^\s@]+$/;
  public configOpenRightBar: string;
  
  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router,  private coachService: CoachService) {  this.toastyConfig.theme = 'bootstrap';

    (<any>$('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });}

  ngOnInit() {
    this.coachs = [];
    this.getAllCoachs();
  }

getAllCoachs() {
  this.coachService.getCoachs().subscribe(data => {
    console.log((Object.values(data)[3]));
    this.coachs = (Object.values(data)[3]);
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
        '  Êtes-vous sûr de vouloir supprimer le Coach   ' + this.coachs[i].prenom + ' ' + this.coachs[i].nom + ' ?',
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
        this.coachService.removeCoach(this.coachs[i].id).subscribe(data => {
          console.log(data);
          /* const found = this.coachs.find(function(element) {
             return element.id === this.coachs[i].id;
           });
           const index = this.coachs.indexOf(found);*/
          swal('Supprimé!', 'Votre coach a été supprimé(e).', 'success');
          // this.coachs.splice(index, 1);
          this.ngOnInit();

        }, error => console.error());

      } else if (result.dismiss) {
        swal('Annulé', 'Votre Coach est securisé(e) :)', 'error');
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


  ajouterCoach(form: NgForm) {
   
    const nom = form.value['nom'];
    const prenom = form.value['prenom'];
    const email = form.value['email'];
    const disponibilite = form.value['disponibilite'];
      // const specilaite = form.value['specialite'];
      const specialite = [];
    // const activite = form.value['activite'];
    const activite = [];

    
    console.log(nom + prenom + email + disponibilite);
    this.coachService.addCoach(nom, prenom, disponibilite, email,specialite, activite).subscribe(data => {
      console.log(data);
      this.addToast('Votre nouveau coach a été ajouté avec succes ', '', 'success');
      this.ngOnInit();

    }, error => console.log(error));
  }

  editCoach(form :NgForm,i){
    console.log(i);
    const id = this.coachs[i].id;
    const email = form.value['email'];
    const disponibilite = form.value['disponibilite'];
    console.log(id + 'iiiiiidddd');
    this.coachService.editCoach(email, disponibilite, this.coachs[i].id).subscribe(data => {
      this.getAllCoachs();
      console.log(data);
      this.addToast('Votre  coach a été modifié avec succes ', '', 'success');
  
    }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

}
