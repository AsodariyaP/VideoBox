import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router'
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'video-box-app';
  userDetails: User = {};
  showLogo: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private localStorageService: LocalStorageService) {
  }

  public ngOnInit(): void {


    // this.router.navigate(['/videos']);

    this.userService.getLoggedInUserDetails().subscribe((res: User) => {
      this.userDetails = res;
      this.localStorageService.setData("loggedInUserInfo", JSON.stringify(res))
    });
  }


  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('videoId');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log(`/videos/${id}`);
        if (event.url === `/videos/${id}`) {
          alert('call')
        }
      }
    });
  }
}
