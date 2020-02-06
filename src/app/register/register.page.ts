import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { LoaderService } from '../service/loader.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  kotakab:any;
  kecamatan:any;
  desa:any;
  kecamatanIsEnabled = true;
  desaIsEnabled = true;

  constructor(private formBuilder: FormBuilder, public loading: LoaderService,
    public menu: MenuController, public router:Router, public apiService : ApiService, public toastController: ToastController) {
    this.menu.enable(false);
    this.registerForm = this.formBuilder.group({
      'pelaksana' : [null, [Validators.required]],
      'tim' : [null, Validators.required],
      'kotakab' : [null, Validators.required],
      'kecamatan' : [null, Validators.required],
      'desa' : [null, Validators.required],
      'target' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
      'password_confirmation' : null
    });
   }

  get f() { return this.registerForm.controls; }


  ngOnInit() {
    this.getKotaKab();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm.value)
    this.registerForm.patchValue({
      password_confirmation : this.registerForm.value.password
    })
    console.log(this.registerForm.value)
    this.loading.present();

    this.apiService.register(this.registerForm.value, 'register').subscribe(res => {
      console.log(res)
      if(res.status == "1"){
        this.presentToast('Terima Kasih, Anda berhasil Register', 'top')
        this.loading.dismiss();
      }
      if(res.error){
        var pes = "";
        for(var obj in res.error) { 
          pes += res.error[obj].toString() + "\n";
          console.log(res.error[obj].toString())
       }
        this.presentToast(pes.toString(), 'bottom')
        this.loading.dismiss();
      }
    });
  }

  getKotaKab(){
    this.apiService.getData('kota-kabupaten').subscribe(res => {
     //console.log(res)
      if(res['status'] == 1){
        this.kotakab = res['data']
      
        //console.log(this.kotakab)
      }
    
    }, (err) => {
 
    });
  }

  getKecamatan(event){
    console.log(event.detail.value)
    this.kecamatanIsEnabled = true;
    this.desaIsEnabled = true;
    this.kecamatan = null;
     this.apiService.getData('kecamatan/' + event.detail.value).subscribe(res => {
      if(res['status'] == 1){
        this.kecamatanIsEnabled = false;
        this.kecamatan = res['data']
        this.desaIsEnabled = true;

        //console.log(this.kotakab)
      }
      
     
     }, (err) => {
  
     });
  }

  getDesa(event){
    console.log(event.detail.value)
    this.desaIsEnabled = true;
    this.desa = null;
    this.apiService.getData('desa/' + event.detail.value).subscribe(res => {
      if(res['status'] == 1){
        this.desaIsEnabled = false;
        this.desa = res['data']
        console.log(res)
      }
      
     
     }, (err) => {
  
     });
  }

  async presentToast(msg, positions) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: positions
    });
    toast.present();
  }

}
