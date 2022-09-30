import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  // Carousel navigation arrow show
  showNavigationArrows: any;
  showNavigationIndicators: any;
  
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Components' },
      { label: 'Carousel', active: true }
    ];
  }

}
