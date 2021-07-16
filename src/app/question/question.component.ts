import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private chRef: ChangeDetectorRef, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private router: Router,) { }

  ngOnInit() {
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

  ajouterQuestion(form: NgForm) {
    this.addToast('Votre question est envoyée avec succès à nos coach, on y répondra dès que possible. Merci','','success');

  }

}
