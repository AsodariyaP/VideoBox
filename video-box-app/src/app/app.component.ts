import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'video-box-app';

  public ngOnInit(): void {
    // fetch('http://localhost:3000/api/videos')
    // .then(console.log);
  }
}
