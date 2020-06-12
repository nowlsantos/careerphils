import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
    @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

    readonly latitude = 14.539521;
    readonly longitude = 121.011537;

    ngAfterViewInit() {
        const coordinates = new google.maps.LatLng(this.latitude, this.longitude);
        const options = {
            zoom: 14,
            center: {
                lat: this.latitude,
                lng: this.longitude
            },
            disableDoubleClickZoom: true,
            maxZoom: 16,
            minZoom: 8
        };

        const googleMap = new google.maps.Map(this.gmap.nativeElement, options);

        const marker = new google.maps.Marker({
            position: coordinates,
            map: googleMap,
            title: 'Career Phils',

            label: {
                color: 'black',
                text: 'Career Phils Shipmanagement Inc.'
            }
        });
        marker.setMap(googleMap);
    }
}
