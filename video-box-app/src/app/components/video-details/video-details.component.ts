import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from "../../services/video.service";
import { VideoDetails, Reactions, StarReaction, ReactionType, SnapshotReaction } from "../../models/video.model";
import { User } from "../../models/user.model";
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  @ViewChild('video') videoElement: ElementRef | undefined;

  capturedImage: string | null = null;
  videoDetails: VideoDetails = {};
  reactions: Array<Reactions> = [];
  videoId: string | null;
  currentTime: number = 0;
  isVideoOwner: boolean = false;
  userInfo: User = {};
  showStarAnimation: boolean = false;
  selectedIndex: number | null = null;

  constructor(private videoService: VideoService, private route: ActivatedRoute, private ls: LocalStorageService, private el: ElementRef) {
    this.videoId = this.route.snapshot.paramMap.get('videoId');
  }

  ngOnInit(): void {
    this.getVideoDetails(this.videoId);
    this.getReactions(this.videoId);
  }

  // Get the video details by videoId from DB.
  public getVideoDetails(videoId: string | null): void {
    if (!videoId) { return };
    this.videoService.getVideoDetails(videoId).subscribe({
      next: (res: VideoDetails) => {
        this.videoDetails = res;
        const getUserinfo: any = this.ls.getData('userInfo');
        const userInfo = JSON.parse(getUserinfo);
        if (userInfo.id === this.videoDetails.author?.id) {
          this.isVideoOwner = true;
        }
      },
      error: (e) => console.error(e)
    })
  }

  // Update the video title by videoId.
  public saveVideoTitle(title: string): void {
    const data = {
      videoId: this.videoId,
      title: title,
    }

    this.videoService.saveVideoTitle(data).subscribe({
      next: (res) => {
        this.isVideoOwner = false;
      },
      error: (e) => console.error(e)
    });
  }

  // Get the video reactions by videoId from db.
  public getReactions(videoId: string | null): void {
    if (!videoId) { return };
    this.videoService.getReactions(videoId).subscribe({
      next: (res) => {
        this.reactions = res.sort((a: any, b: any) => {
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        });
      },
      error: (e) => console.error(e)
    });
  }

  // Capture the snapshot of video while play/pause mode using canvas. 
  public snapshotCapture(): void {
    const video: HTMLVideoElement = this.videoElement?.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
      this.saveSnapshot(this.capturedImage);
    }
  }

  // Save the captured snapshot of video in db. 
  public saveSnapshot(capturedImage: string | null): void {
    const data: SnapshotReaction = {
      videoId: this.videoId,
      type: ReactionType.snapshot,
      timeframe: this.currentTime, // video player current time in seconds
      dataUri: capturedImage
    }

    this.videoService.reactions(data).subscribe({
      next: (res) => {
        this.reactions = res.sort((a: any, b: any) => {
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime() || new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        });
      },
      error: (e) => console.error(e)
    });
  }

  // Give the star reaction on the play/pause video of current timeframe.
  public starReaction(): void {
    const data: StarReaction = {
      videoId: this.videoId,
      type: ReactionType.star,
      timeframe: this.currentTime // video player current time in seconds
    }

    this.videoService.reactions(data).subscribe({
      next: (res) => {
        this.reactions = res.sort((a: any, b: any) => {
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime() || new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        });
      },
      error: (e) => console.error(e)
    });
  }

  // Get the video current timeframe using timeupdate event.
  public getCurrentTime(data: any): void {
    this.currentTime = data.target.currentTime;
  }

  // Set specific timeframe and pause the video by click on the reaction. 
  public setReactionTime(data: any, index: number): void {
    this.selectedIndex = index;
    if (this.videoElement) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.currentTime = data.timeframe;
      video.pause();
    }
  }
  
  public sorting(data: any) {
    data.sort((a: any, b: any) => {
      // First, compare by priority
      if (a.createdDate < b.createdDate) return -1;
      if (a.postedDate > b.postedDate) return 1;

      // If priorities are the same, compare by date
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;

      // If both keys are the same, no change in order
      return 0;
    });
  }

  public showReactionIcon(): void {
    const icon = document.querySelector('.star-icon');
    icon?.classList.add('clicked');

    setTimeout(() => {
      icon?.classList.remove('clicked');
    }, 5000);


    // this.showStarAnimation = true;
    // setTimeout(() => {
    //   this.showStarAnimation = false;
    // }, 5000); // Remove the star animation after 3 seconds (adjust as needed)
  }
}
