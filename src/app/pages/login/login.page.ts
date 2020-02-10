import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { LoaderService } from '../../service/loader.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(public loading: LoaderService, public menu: MenuController, private formBuilder: FormBuilder, private router:Router, public apiService : ApiService, public toastController: ToastController) {
    this.menu.enable(false);
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
  }

  ionViewWillEnter() {
    if(localStorage.getItem('authBPN') ){
      this.router.navigate(['/dashboard'], {replaceUrl: true});
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    console.log(this.loginForm.value)
    this.loading.present();
    this.apiService.login(this.loginForm.value, 'login').subscribe(res => {
      console.log(res)
      if(res.token_type == 'Bearer'){
        this.router.navigate(['/dashboard'], {replaceUrl: true})
        localStorage.setItem('authBPN', JSON.stringify(res));

        this.loading.dismiss();
      }
      if(res.error){
        this.presentToast(res.message.toString(), 'bottom')
        this.loading.dismiss();
      }
    });
  }

  get f() { return this.loginForm.controls; }

  async presentToast(msg, positions) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: positions
    });
    toast.present();
  }

  registerPage(){
    this.router.navigate(['/register' ], {replaceUrl: true});
  }

}
