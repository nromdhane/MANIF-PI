import { Component, OnInit } from '@angular/core';
import { Specialite } from '../../Model/specialite';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  specialites:Specialite[]=[
    {id:1, nom:"Body Combat", type:"Cardio intensif"},
    {id:2, nom:"zumba", type:"Dance"},
    {id:3, nom:"step", type:"Cardio"},
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
