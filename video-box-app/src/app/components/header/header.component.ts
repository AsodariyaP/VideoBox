import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: User = {};
  showLogo: boolean = true;
  videoId: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private ls: LocalStorageService) {
  }

  public ngOnInit(): void {
    this.login();
    this.setBackIcon();
  }

  // Get the user info from db and set on localstorage 
  public login(): void {
    this.userService.getLoggedInUserDetails().subscribe({
      next: (res: User) => {
        this.userDetails = res;
        this.ls.setData("userInfo", JSON.stringify(res))
      },
      error: (e) => console.error(e)
    });
  }

  // Set the back icon for video details page
  public setBackIcon(): void {
    this.router.events.subscribe(event => {
      let route = this.route;
      while (route.firstChild) {
        route = route.firstChild
      }

      route.params.subscribe(params => {
        if (params['videoId']) {
          this.videoId = params['videoId']
        }
        if (event instanceof NavigationEnd) {
          if (event.url == `/videos/${this.videoId}`) {
            this.showLogo = false
          } else if (event.url == `/videos`) {
            this.showLogo = true
          }
        }
      });
    });
  }
}
