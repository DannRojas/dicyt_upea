import { Component, OnDestroy, ChangeDetectorRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { UserInterface } from './Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'DICyT-UPEA';
  opened: boolean;

  @ViewChild('toogle')
  toogle: ElementRef;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public isLogin: boolean = false;
  public user: UserInterface;

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.user = this.authService.getCurrentUser();
    if(this.user === null || this.user === undefined){
      this.isLogin=false;
      }else{
        this.isLogin = true;
      }
    }


    logout(){
      this.authService.logoutUser().subscribe(data => location.reload());
    }

    toogler() {
      this.toogle.nativeElement.click();
    }
}
