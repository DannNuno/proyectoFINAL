import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonTextarea, IonButton,  } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-gym-cerca',
  templateUrl: './gym-cerca.page.html',
  styleUrls: ['./gym-cerca.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonItem, IonLabel, IonButton, FormsModule]
})
export class GymCercaPage {
  map!: L.Map;
  nombre: string = '';
  descripcion: string = '';
  lat: number = 0;
  lon: number = 0;

  // Inyectar Firestore para almacenar los gimnasios
  constructor(private firestore: Firestore) {}

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
    this.lat = coords.coords.latitude;
    this.lon = coords.coords.longitude;

    this.map = L.map(mapContainer).setView([this.lat, this.lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    L.marker([this.lat, this.lon])
      .addTo(this.map)
      .bindPopup('Estás aquí')
      .openPopup();

    requestAnimationFrame(() => {
      this.map.invalidateSize();
    });

    // Mostrar gimnasios cercanos
    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    const query = `
      [out:json];
      node
        ["leisure"="fitness_centre"]
        (around:3000,${this.lat},${this.lon});
      out;
    `;
    
    fetch(overpassUrl, {
      method: 'POST',
      body: query
    })
    .then(res => res.json())
    .then(data => {
      data.elements.forEach((element: any) => {
        L.marker([element.lat, element.lon])
          .addTo(this.map)
          .bindPopup(element.tags.name || 'Gimnasio desconocido');
      });
    })
    .catch(err => console.error('Error al obtener gimnasios:', err));

    // Manejar clics en el mapa para agregar un gimnasio
    this.map.on('click', (e: any) => {
      this.lat = e.latlng.lat;
      this.lon = e.latlng.lng;

      const popupContent = `
        <div>
          <label>Nombre del gimnasio:</label><br>
          <input id="gymName" type="text" /><br>
          <label>Descripción:</label><br>
          <textarea id="gymDesc"></textarea><br>
          <button onclick="saveGym()">Guardar</button>
        </div>
      `;

      L.popup()
        .setLatLng([this.lat, this.lon])
        .setContent(popupContent)
        .openOn(this.map);
    });
  }

  // Función para guardar gimnasio en Firestore
  async agregarGimnasio() {
    const gimnasio = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      latitud: this.lat,
      longitud: this.lon
    };

    // Guardar el gimnasio en Firestore
    const gimnasiosRef = collection(this.firestore, 'gimnasios');
    await addDoc(gimnasiosRef, gimnasio);

    console.log('Gimnasio agregado');
  }
}
