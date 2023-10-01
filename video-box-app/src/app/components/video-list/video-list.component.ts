import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service'
import { Video, View } from '../../models/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})

export class VideoListComponent implements OnInit {

  videos: Array<Video> = [];
  selectedView: string = View.grid;

  constructor(private videoListService: VideoService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  // Get video list as an array from db 
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
  
}
