import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {
  ToastData,
  ToastOptions,
  ToastyService,
  ToastyConfig
} from 'ng2-toasty';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CategorieService} from '../../services/categorie.service';

declare var $;

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  categories;

  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
              private toastyConfig: ToastyConfig, private router: Router, private categorieService: CategorieService

  ) {
    this.toastyConfig.theme = 'bootstrap';

    (<any>  $('#dtBasicExample')).DataTable({
      destroy: true,
      searching: true,
      paging: true,
      ordering: true
    });
  }

  ngOnInit() {
    this.categories = [];
    this.getAllCategories();
  }
  getAllCategories() {
    this.categorieService.getCategories().subscribe(data => {
        console.log((Object.values(data)[3]));
        this.categories = (Object.values(data)[3]);
        this.chRef.detectChanges();
        //  jQuery DataTables :
        const table: any = $('#dtBasicExample');
        this.dataTable = table.DataTable();
        $('.dataTables_length').addClass('bs-select');
      },
      error => {
        console.log('failed' + error);
      });
  }
  openSuccessCancelSwal(i) {
    console.log(i);
    swal({
      title:
        '  Êtes-vous sûr de vouloir supprimer cette catégorie   ' + this.categories[i].nom + ' ' + this.categories[i].type + '' + this.categories[i].caracteristique + ' ?',
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
        this.categorieService.removeCategorie(this.categories[i].id).subscribe(data => {
          this.getAllCategories();
          console.log(data);
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
  ajouterCategorie(form: NgForm) {
    const nom = form.value['nom'];
    const type = form.value['type'];
    const caracteristique = form.value['caracteristique'];
    // const salleDeSport = form.value['salleDeSport'];
   // const salleDeSport = [];
    console.log(nom + type + caracteristique);
    this.categorieService.addCategorie(nom, type, caracteristique).subscribe(data => {
      this.getAllCategories();
      console.log(data);
      this.addToast('Ajout Catégorie', 'votre nouvel catégorie est ajouté avec succés', 'success');
      this.ngOnInit();

    }, error => console.log(error));

  }

  editCategorie(form: NgForm, i) {
    console.log(i);
    const id = this.categories[i].id;
    const nom = form.value['nom'];
    const type = form.value['type'];
    const caracteristique = form.value['caracteristique'];
    console.log(id + 'iiiiiidddd');
    this.categorieService.editCategorie(nom, type, caracteristique,  this.categories[i].id).subscribe(data => {
        this.getAllCategories();
        console.log(data);
        this.addToast('Votre  catégorie a été modifié avec succes ', '', 'success');
      }
      , error => {
        console.log(error);
        this.addToast('Une erreur est survenue lors de la modification', '', 'error');

      });

  }

}
