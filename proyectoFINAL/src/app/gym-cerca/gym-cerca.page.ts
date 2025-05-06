import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-gym-cerca',
  templateUrl: './gym-cerca.page.html',
  styleUrls: ['./gym-cerca.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class GymCercaPage {
  map!: L.Map;

  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Contenedor del mapa no encontrado');
      return;
    }

    const coords = await Geolocation.getCurrentPosition();
    const lat = coords.coords.latitude;
    const lon = coords.coords.longitude;

    this.map = L.map(mapContainer).setView([lat, lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Estás aquí')
      .openPopup();

      requestAnimationFrame(() => {
        this.map.invalidateSize();
      });
      
  }
}
