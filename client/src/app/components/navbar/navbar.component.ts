import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { isNullOrUndefined } from 'util';
import { UserInterface } from '../../Models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }
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


}
