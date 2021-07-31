import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie';
/*import {Categorie} from './model/categorie';*/

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorieUrl = 'http://127.0.0.1:8000/api/categories?page=1';
  private addCategorieUrl = 'http://127.0.0.1:8000/api/categories';
  formData = new Categorie();

  constructor(private http: HttpClient, private router: Router, public CategorieService:CategorieService) {}
  

  getCategories() {
    return this.http.get<any>(this.categorieUrl);
  }
  addCategorie(nom, type, caracteristique) {
    return this.http.post(this.addCategorieUrl, {
      'nom': nom,
      'type': type,
      'caracteristique': caracteristique,
      //'sallesDeSport': salleDeSport
    });
  }
  editCategorie(nom, type, caracteristique, id) {
    console.log('id from service' + id);
    const editCategorieUrl = 'http://127.0.0.1:8000/api/categories/' + id;

    return this.http.put(editCategorieUrl, {
      'nom': nom,
      'type': type,
      'caracteristique': caracteristique,

    });

  }
  removeCategorie(id) {
    const editCategorieUrl = 'http://127.0.0.1:8000/api/categories/' + id;

    return this.http.delete(editCategorieUrl);
  }


}
