import {Component, OnDestroy, OnInit} from '@angular/core';
import {Map, tileLayer, marker, circle} from 'leaflet';



@Component({
    selector: 'app-my-map',
    templateUrl: './my-map.page.html',
    styleUrls: ['./my-map.page.scss'],
})
export class MyMapPage implements OnInit, OnDestroy {

    public map: Map;

    constructor() {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.leafletInit();
    }

    leafletInit() {
        const coords = [33.6396965, -84.4304574];
        this.map = new Map('mapView');
        this.map.setView(coords, 23);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);


        circle(coords, {color: 'green', radius: 10}).addTo(this.map);
    }

    ngOnDestroy(): void {
        this.map.remove();
    }

}
