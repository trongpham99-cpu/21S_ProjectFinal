import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import * as firebase from 'firebase';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  implements OnInit {
  constructor(
    private userService: UserService,
    public auth: AngularFireAuth,
    // public player: LoginService
    // public router: Router,
  ) {}
  public user = null;
  async login() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    try {
      await this.auth.signInWithPopup(provider);
      console.log(this.user.uid)
      if (this.user!=null) {
        await this.userService.createUser(
          this.user.displayName,
          this.user.email,
          this.user.photoURL,
          this.user.uid,
          this.user.phone,
          this.user.password
        );
        alert('chuyen trang')
      }
      this.userService.user = this.user
    } catch (err) {
      alert(err);
    }
  }

  
  ID: any;
  PW: any;

  async loginNow(){
    try{
      return await this.userService.login(
        this.ID,
        this.PW
      ).then((res=>{
        console.log(res)
      }))
    } catch (err){
      console.log(err);
    }
  }





  ngOnInit(): void {
    // this.player.getUser(this.user)
  }
  ngOnDestroy(): void {
    this.user = null;
  }
}