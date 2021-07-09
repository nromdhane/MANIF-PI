import { Component, OnInit } from '@angular/core';
import { Coach } from '../../Model/coach';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {

  coachs:Coach[]=[
    {id:1, nom:"Romdhane", prenom:"Nour", email:"Nour.Romdhane@outlook.com", specialite:"LESMILLS", formation:"Licence Sport", experience:"Personal Trainer ", activite:"BodyCombat"},
    {id:2, nom:"Rom", prenom:"Nou", email:"NouRomdhane@outlook.com", specialite:"Fitness", formation:"Formtion à GYMCLUB", experience:"Educateur en Sport-Santé", activite:"Zumba"},
    {id:3, nom:"ibtissem", prenom:"benTlili", email:"IbtissemBenTlili@outlook.com", specialite:"Renforcement Musculaire", formation:"LICENCE Entrainement sportif", experience:"Coach sportif à California", activite:"PUMP"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
