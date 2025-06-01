import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';


@Component({
  selector: 'app-detalle-ejercicio',
  templateUrl: './detalle-ejercicio.page.html',
  styleUrls: ['./detalle-ejercicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetalleEjercicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  
}

}
