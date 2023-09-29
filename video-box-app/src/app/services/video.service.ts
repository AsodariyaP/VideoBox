import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StarReaction } from '../models/video.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  public getVideos(): Observable<any> {
    return this.http.get(`${baseUrl}/api/videos`);
  }

  public getVideoDetails(videoId: string | null): Observable<any> {
    return this.http.get(`${baseUrl}/api/videos/${videoId}`);
  }

  public saveVideoTitle(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/api/videos/${data.videoId}`, data);
  }

  public getReactions(videoId: string): Observable<any> {
    return this.http.get(`${baseUrl}/api/videos/${videoId}/reactions`);
  }

  public starReaction(data: StarReaction): Observable<any> {
    return this.http.post(`${baseUrl}/api/videos/${data.videoId}/reactions`, data);
  }

}
