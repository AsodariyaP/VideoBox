import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  @Input() videos: any;
  constructor(private router: Router) { }

  // Navigate to video details page
  goToDetails(videoId: string | undefined) {
    this.router.navigate(['/videos', videoId]);
  }
}
