import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Nutritionniste } from '../model/nutritionniste';

@Injectable({
  providedIn: 'root'
})
export class NutritionnisteService {
  private nutritionnistesUrl = 'http://127.0.0.1:8000/api/nutritionnistes?page=1';
  private addNutritionnisteUrl = 'http://127.0.0.1:8000/api/nutritionnistes';
  // private editNutritionnisteUrl = 'http://127.0.0.1:8000/api/nutritionnistes/';


  
  constructor(private http: HttpClient, private router: Router) { }
  getNutritionnistes() {
    return this.http.get<any>(this.nutritionnistesUrl);
  }

  // tslint:disable-next-line:no-shadowed-variable
  addNutritionniste(nom, prenom, disponibilite, email, salleDeSport, tel) {
    return this.http.post(this.addNutritionnisteUrl, {
      'nom': nom,
      'prenom': prenom,
      'email': email,
      'disponibilite': disponibilite,
      'tel': tel,
      //'sallesDeSport': salleDeSport
    });
  }
  editNutritionniste(email, disponibilite, tel, id) {
    console.log('id from service' + id);
    const editNutritionnisteUrl = 'http://127.0.0.1:8000/api/nutritionnistes/' + id;

    return this.http.put(editNutritionnisteUrl, {
      'email': email,
      'disponibilite': disponibilite,
      'tel': tel,

    });

  }
  removeNutritionniste(id) {
    const editNutritionnisteUrl = 'http://127.0.0.1:8000/api/nutritionnistes/' + id;

    return this.http.delete(editNutritionnisteUrl);
  }

}
