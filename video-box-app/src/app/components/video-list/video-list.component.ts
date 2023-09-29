import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service'
import { Video, View } from '../../models/video.model';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})

export class VideoListComponent implements OnInit {



  
  videos: Array<Video> = [];
  selectedView: string = 'grid';

  constructor(private router: Router, private videoListService: VideoService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videoListService.getVideos().subscribe((res: Array<Video>) => {
      this.videos = res;
    });
  }

  changeView(type: string): void {
    if (type === View.grid) {
      this.selectedView = View.grid;
    } else {
      this.selectedView = View.list;
    }
  }

  goToDetails(videoId: string) {
    this.router.navigate(['/videos', videoId]);
  }
}
