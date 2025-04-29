import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-gym-cerca',
  templateUrl: './gym-cerca.page.html',
  styleUrls: ['./gym-cerca.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GymCercaPage implements OnInit {

  constructor() { }
  map: L.Map = {} as L.Map;

  ngOnInit() {
    this.loadMap();
  }
  async getUserLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  }




  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;
  
    this.map = L.map('map').setView([lat, lon], 15);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
    L.marker([lat, lon]).addTo(this.map)
      .bindPopup('Estás aquí')
      .openPopup();
  }

}
