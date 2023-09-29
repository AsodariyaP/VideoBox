import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from "../../services/video.service";
import { VideoDetails, Reactions, StarReaction } from "../../models/video.model";
import { User } from "../../models/user.model";
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  videoDetails: VideoDetails = {};
  reactions: Array<Reactions> = [];
  videoId: string | null;
  currentTime: number = 0;
  isVideoOwner: boolean = false;
  userInfo: User = {};

  constructor(private videoService: VideoService, private route: ActivatedRoute, private ls: LocalStorageService) {
    this.videoId = this.route.snapshot.paramMap.get('videoId');
  }

  ngOnInit(): void {
    this.getVideoDetails(this.videoId);
    this.getReactions(this.videoId);
  }

  public getVideoDetails(videoId: string | null): void {
    if (!videoId) { return };
    this.videoService.getVideoDetails(videoId).subscribe((res: VideoDetails) => {
      this.videoDetails = res;
      const getUserinfo: any = this.ls.getData('loggedInUserInfo');
      const userInfo = JSON.parse(getUserinfo);
      if (userInfo.id === this.videoDetails.author?.id) {
        this.isVideoOwner = true;
      }
      // console.log(res);
    });
  }

  public saveVideoTitle(title: string): void {
    const data = {
      videoId: this.videoId,
      title: title,
    }

    this.videoService.saveVideoTitle(data).subscribe({
      next: (res: VideoDetails) => { 
        this.isVideoOwner = false;
      },
      error: (e) => console.error(e)
    });
  }

  public getReactions(videoId: string | null): void {
    if (!videoId) { return };
    this.videoService.getReactions(videoId).subscribe(
      (res) => {
      // console.log(res);
      this.reactions = res.sort((a: any, b: any) => {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime() || new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      });
    });
  }

  public snapshotCapture() {

  }

  public starReaction(): void {
    const data: StarReaction = {
      videoId: this.videoId,
      type: 'star',
      timeframe: this.currentTime
    }

    this.videoService.starReaction(data).subscribe((res) => {
      this.reactions = res.sort((a: any, b: any) => {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime() || new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();;
      });
    });
  }

  setCurrentTime(data: any): void {
    this.currentTime = data.target.currentTime;
  }
}
