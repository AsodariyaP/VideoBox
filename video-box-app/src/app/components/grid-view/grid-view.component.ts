import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent {

  @Input() videos: any;
  constructor(private router: Router) { }

  // Navigate to video details page
  goToDetails(videoId: string | undefined) {
    this.router.navigate(['/videos', videoId]);
  }

}
