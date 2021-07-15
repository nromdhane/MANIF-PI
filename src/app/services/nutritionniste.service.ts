import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { nutritionniste } from '../model/nutritionniste';

@Injectable({
  providedIn: 'root'
})
export class NutritionnisteService {
  private nutritionnistesUrl = 'http://localhost/Findyourgym/api/nutritionnistes';
  private addNutritionnisteUrl = 'http://localhost/Findyourgym/api/nutritionnistes';

  constructor(private http: HttpClient, private router: Router) { }
  getNutritionnistes() {
    return this.http.get<nutritionniste []>(this.nutritionnistesUrl);
     }

   addNutritionniste ( nutritionniste) {
      return this.http.post(this.addNutritionnisteUrl, {
        'nom': nutritionniste.nom,
        'prenom': nutritionniste.prenom,
        'email': nutritionniste.email,
        'disponibilite': nutritionniste.disponibilite,
        'num': nutritionniste.num,
        'salleDeSport':nutritionniste.salleDeSport
      });
    }

     
}
