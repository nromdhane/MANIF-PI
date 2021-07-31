import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';
import {
  ToastData,
  ToastOptions,
  ToastyService,
  ToastyConfig
} from 'ng2-toasty';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';
import { EvenementService } from 'src/app/services/evenement.service';
import { Categorie } from 'src/app/model/categorie';
declare var $;
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  isDisable = false;
  date_debut;
  dated;
  datef;
  havemax:boolean=false;
  date_fin;
  duree = 0;
  myDate = new Date(Date.now());
  listecategorie;
  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  evenements;
  listCategorie: any[];
  elmentEvnt: any;
  showforPart: boolean;
  constructor(private chRef: ChangeDetectorRef,
    private eventservice:EvenementService,
    private datePipe: DatePipe,private toastyService: ToastyService) {
    (<any>  $('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });
  }
  public listItems: Array<string> = [];
  ngOnInit() {
    this.listCategorie=[];
    this.evenements = [];
    this.getAllEvenements();
    this.date_debut = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.dropdownRefresh();
    this.eventservice.getAllCategories().subscribe(data=>{
     console.log(data)
     this.listecategorie=data;

    });
  }
  dropdownRefresh(){
    this.eventservice.getCategoriesDropDownValues().subscribe(data=>{
      console.log(data);
      data.forEach(element => {
       // this.listItems.push(element["nom"]);
      });
    })
  }
  getAllEvenements() {
    this.eventservice.getEvents().subscribe(a=>{
      console.log("event data ",a);
      a["hydra:member"].forEach(element => {
        this.eventservice.getCategorieById(element.categorie).subscribe(b=>{
         // this.listCategorie.push(a)
         element.categorie=b.nom;
         this.evenements.push(element)
        })
      });
    })

  }
  doParticiper(element){
this.elmentEvnt=element;
this.showforPart=true;
  }
 

  openSuccessCancelSwal(i) {
    swal({
      title:
        'Êtes-vous sûr de vouloir supprimer' + ' cet événement ?',
      text: 'Cette action ne peut pas être annulée !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd3333',
      confirmButtonText: 'Desactiver événement',
      cancelButtonText: 'Fermer',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then(result => {
      if (result.value) {
        this.eventservice.removeEvenement(this.evenements[i].id).subscribe(data => {
          this.getAllEvenements
          console.log(data);
          
          swal('Supprimé!', 'Votre event a été supprimé(e).', 'success');
          

        }, error => console.error());


      } else if (result.dismiss) {
        swal('Annulé', 'Votre event est securisé(e) :)', 'error');
      }
    });
  }

  updateStatus(i): void {}
  terminated(i): void {}
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
  ajouterEvenement(form: NgForm) {
   const titre = form.value['titre'];
    const description = form.value['description'];
    const date_debut = form.value['date_debut'];
    const date_fin = form.value['date_fin'];
    const duree = form.value['duree'];
    const lieu= form.value['lieu'];

    // const salleDeSport = form.value['salleDeSport'];
   // const salleDeSport = [];
    console.log(titre + description + date_debut + date_fin +duree + lieu);
    this.eventservice.addEvenement(titre,description,date_debut,date_fin,duree,lieu).subscribe(data => {
      this.getAllEvenements
      console.log(data);
      this.addToast('Ajout événement', 'votre nouvel événement est ajouté avec succés', 'success');
      this.ngOnInit();

    }, error => console.log(error));

  }
  editEvenement(form: NgForm, i) {
    console.log(i);
    const id = this.evenements[i].id;
    const titre = form.value['titre'];
    const description = form.value['description'];
    const date_debut = form.value['date_debut'];
    const date_fin = form.value['date_fin'];
    const duree = form.value['duree'];
    const lieu= form.value['lieu'];
    console.log(id + 'iiiiiidddd');
    this.eventservice.editEvenement(titre,description,date_debut,date_fin,duree,lieu, this.evenements[i].id).subscribe(data => {
        this.getAllEvenements();
        console.log(data);
        this.addToast('Votre événement a été modifié avec succes ', '', 'success');
      }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }
  cal(){
    this.dated = new Date(this.date_debut).getTime();
    alert(this.dated);
    this.datef = this.dated + (this.duree*(86400000));
    this.date_fin = this.datePipe.transform(this.myDate,'yyyy-MM-dd');    
}
diff(){
  this.dated = new Date(this.date_debut).getTime();
  this.datef = new Date(this.date_fin).getTime();
  this.duree = (this.datef - this.dated)/86400000;
}

}

