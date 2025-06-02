import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem, IonInput, IonLabel, IonTextarea, IonButton, IonImg} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gym-cerca',
  templateUrl: './gym-cerca.page.html',
  styleUrls: ['./gym-cerca.page.scss'],
  standalone: true,
  imports: [ IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonItem,  IonButton,FormsModule, IonImg ]
})
export class GymCercaPage {
   constructor(private router: Router) {}
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

 // gimnasios cerca
      const overpassUrl = 'https://overpass-api.de/api/interpreter';
      const query = `
        [out:json];
        node
          ["leisure"="fitness_centre"]
          (around:3000,${lat},${lon});
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
      

      // por si no hay alguno que se pueda agregar manualmente

      // async agregarGimnasio() {
      //   const position = await Geolocation.getCurrentPosition();
      //   const lat = position.coords.latitude;
      //   const lng = position.coords.longitude;
    
      //   const gimnasio = {
      //     nombre: this.nombre,
      //     descripcion: this.descripcion,
      //     latitud: lat,
      //     longitud: lng
      //   };
    
      //   const gimnasiosRef = collection(this.firestore, 'gimnasios');
      //   await addDoc(gimnasiosRef, gimnasio);
    
      //   console.log('Gimnasio agregado');
      // }


      // const gimnasio = {
      //   nombre: this.nombre,
      //   descripcion: this.descripcion,
      //   latitud: lat,
      //   longitud: lng
      // };
      




      // this.map.on('click', (e: any) => {
      //   const lat = e.latlng.lat;
      //   const lon = e.latlng.lng;
      
      //   const popupContent = `
      //     <div>
      //       <label>Nombre del gimnasio:</label><br>
      //       <input id="gymName" type="text" /><br>
      //       <button onclick="saveGym(${lat}, ${lon})">Guardar</button>
      //     </div>
      //   `;
      
      //   L.popup()
      //     .setLatLng([lat, lon])
      //     .setContent(popupContent)
      //     .openOn(this.map);
      // });

  }
  busqueda: string = '';

async buscarGimnasio() {
  if (!this.busqueda) {
    alert('Escribe un nombre para buscar');
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.busqueda)}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.length === 0) {
      alert('No se encontró el gimnasio');
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    this.map.setView([lat, lon], 18); // Enfocar con zoom
    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup(this.busqueda)
      .openPopup();
  } catch (err) {
    console.error('Error al buscar gimnasio:', err);
  }
}
  navigateToIndex(){
    this.router.navigateByUrl("index");
  }

}
