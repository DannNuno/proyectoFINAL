import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IndexPage implements OnInit {

  constructor(private router:Router, private elRef:ElementRef, private auth:AuthService) { }









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

  logout() {  
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Error during logout:', error);
    });
   
  }





}
