import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Specialite } from '../model/specialite';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private specialitesUrl = 'http://127.0.0.1:8000/api/specialites?page=1'; ​
  private addSpecialiteUrl = 'http://127.0.0.1:8000/api/specialites';
   private editSpecialiteUrl = 'http://127.0.0.1:8000/api/specialites/';

   constructor(private http: HttpClient, private router: Router) { }
   getSpecialites() {
     return this.http.get<any>(this.specialitesUrl);
   }
 
   // tslint:disable-next-line:no-shadowed-variable
   addSpecialite(nom, type, coach) {
     return this.http.post(this.addSpecialiteUrl, {
       'nom': nom,
       'type': type,
       //'coach': coach,
     });
   }
   editSpecialite(type, id) {
     console.log('id from service' + id);
     const editSpecialiteUrl = 'http://127.0.0.1:8000/api/specialites/' + id;
 
     return this.http.put(editSpecialiteUrl, {
       'type': type,
       
 
     });
 
   }
   removeSpecialite(id) {
     const editSpecialiteUrl = 'http://127.0.0.1:8000/api/specialites/' + id;
 
     return this.http.delete(editSpecialiteUrl);
   }
 
 }
 