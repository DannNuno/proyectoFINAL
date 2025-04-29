import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gym-cerca',
  templateUrl: './gym-cerca.page.html',
  styleUrls: ['./gym-cerca.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GymCercaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
