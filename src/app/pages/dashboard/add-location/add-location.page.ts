import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { LoaderService } from '../../../service/loader.service';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {
  AddLocationForm: FormGroup;
  submitted = false;
  kotakab:any;
  kecamatan:any;
  desa:any;
  kecamatanIsEnabled = true;
  desaIsEnabled = true;

  constructor(private formBuilder: FormBuilder, public loading: LoaderService,
    public menu: MenuController, public router:Router, public apiService : ApiService, public toastController: ToastController) {
    this.menu.enable(false);
    this.AddLocationForm = this.formBuilder.group({
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

  ngOnInit() {
    this.getKotaKab();
  }

  getKotaKab(){
    this.loading.present();
    this.apiService.getData('kota-kabupaten').subscribe(res => {
     //console.log(res)
      if(res['status'] == 1){
        this.kotakab = res['data']
        this.loading.dismiss();

        //console.log(this.kotakab)
      }
    
    }, (err) => {
      this.presentToast("Terjadi Kesalahan, silakan coba lagi nanti :(", "bottom");

    });
  }

  getKecamatan(event){
    this.loading.present();
    console.log(event.detail.value)
    this.kecamatanIsEnabled = true;
    this.desaIsEnabled = true;
    this.kecamatan = null;
     this.apiService.getData('kecamatan/' + event.detail.value).subscribe(res => {
      if(res['status'] == 1){
        this.kecamatanIsEnabled = false;
        this.kecamatan = res['data']
        this.desaIsEnabled = true;
        this.loading.dismiss();

        //console.log(this.kotakab)
      }
      
     
     }, (err) => {
      this.presentToast("Terjadi Kesalahan, silakan coba lagi nanti :(", "bottom");

     });
  }

  getDesa(event){
    this.loading.present();
    console.log(event.detail.value)
    this.desaIsEnabled = true;
    this.desa = null;
    this.apiService.getData('desa/' + event.detail.value).subscribe(res => {
      if(res['status'] == 1){
        this.desaIsEnabled = false;
        this.desa = res['data']
        console.log(res)
        this.loading.dismiss();

      }
      
     
     }, (err) => {
      this.presentToast("Terjadi Kesalahan, silakan coba lagi nanti :(", "bottom");

     });
  }
  async presentToast(msg, positions) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: positions
    });
    toast.present();
  }

}
