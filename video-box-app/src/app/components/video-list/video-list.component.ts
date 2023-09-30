import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service'
import { Video, View } from '../../models/video.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})

export class VideoListComponent implements OnInit {

  videos: Array<Video> = [];
  selectedView: string = View.grid;

  constructor(private router: Router, private videoListService: VideoService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  // Get videos from db 
  getVideos(): void {
    this.videoListService.getVideos().subscribe({
      next: (res: Array<Video>) => {
        this.videos = res;
      },
      error: (e) => console.error(e)
    });
  }

  // Change the view mode for display videos 
  changeView(type: string): void {
    if (type === View.grid) {
      this.selectedView = View.grid;
    } else {
      this.selectedView = View.list;
    }
  }

  // Navigate to video details page
  goToDetails(videoId: string | undefined) {
    this.router.navigate(['/videos', videoId]);
  }
}
