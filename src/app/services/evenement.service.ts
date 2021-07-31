import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieService } from './categorie.service';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private evenementUrl = 'http://127.0.0.1:8000/api/evenements?page=1';
  url = 'http://127.0.0.1:8000/';
  private addEvenementUrl = 'http://127.0.0.1:8000/api/evenements';
  //formData = new Categorie();
  constructor(private http: HttpClient, private router: Router) { }
  getEvenements() {
    return this.http.get<any>(this.evenementUrl);
  }
  addEvenement(titre,description,date_debut,date_fin,duree,lieu) {
    return this.http.post(this.addEvenementUrl, {
    titre:titre,
    description:description,
    date_debut:date_debut,
    date_fin:date_fin,
    duree: duree,
    lieu: lieu,
    });
  }
  editEvenement(titre,description,date_debut,date_fin,duree,lieu,id) {
    console.log('id from service' + id);
    const editCategorieUrl = 'http://127.0.0.1:8000/api/evenements' + id;

    return this.http.put(editCategorieUrl, {
      titre:titre,
    description:description,
    date_debut:date_debut,
    date_fin:date_fin,
    duree: duree,
    lieu: lieu,

    });

  }
  removeEvenement(id) {
    const editEvenementUrl = 'http://127.0.0.1:8000/api/evenements/' + id;

    return this.http.delete(editEvenementUrl);
  }

  getEvents() {
    return this.http.get<any>(this.evenementUrl);
  }
  getAllCategories() {
    return this.http.get<any>(this.url + 'categories');
  }
  getCategorieById(id) {
    return this.http.get<any>('http://127.0.0.1:8000' + id);
  }
  getCategoriesDropDownValues():Observable<any>{
    return this.http.get<any>(this.url+'/categories');
  }
}
