import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-ejercicio',
  templateUrl: './detalle-ejercicio.page.html',
  styleUrls: ['./detalle-ejercicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class DetalleEjercicioPage implements OnInit {

  ejercicio: any;
  videoUrlSeguro: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const data = localStorage.getItem('ejercicioActual');
    if (data) {
      this.ejercicio = JSON.parse(data);
      if (this.ejercicio.video) {
        this.videoUrlSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(this.ejercicio.video);

      }
      console.log('Ejercicio cargado:', this.ejercicio);
    }
  }
}
