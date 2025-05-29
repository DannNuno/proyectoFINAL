import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IndexPage implements OnInit {

  constructor(private router:Router, private elRef:ElementRef) { }









  ngOnInit() {
  }
  navigateToEjercicios(){
    this.router.navigateByUrl("ejercicios");
  }
   navigateToMapa(){
    this.router.navigateByUrl("gym-cerca");
  }
   navigateToComentarios(){
    this.router.navigateByUrl("comentarios");
  }







}
