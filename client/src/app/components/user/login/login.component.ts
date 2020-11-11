import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInterface } from '../../../Models/User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private toastrService: ToastrService) { }

  @ViewChild('formLogin')
  formLogin: NgForm;

  public user: UserInterface = {};
  public hide: boolean = true;

  public isError: boolean = false;

  ngOnInit(): void {
  }

  onLogin() {
    if (this.formLogin.valid) {
      this.user.username = this.user.username.toLowerCase();
      this.user.password = this.user.password.toLowerCase();
      this.authService.loginUser(this.user.username, this.user.password).subscribe(data => {
        this.authService.setToken(data.id);
        let user = data.user;
        this.authService.setUser(user);
        this.toastrService.success("Usuario logeado satisfactoriamente");
        location.reload();
      }, (error: HttpErrorResponse) => {
        this.toastrService.error(`error ${error.error.error.message}`);
        this.isError = true;
        this.onResetForm();
        setTimeout(() => {
          this.isError = false;
        }, 4000);
      });
    }
  }

  onResetForm() {
    this.user = Object.assign({});
    this.formLogin.reset();
    this.formLogin.resetForm();
  }

}
