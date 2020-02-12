import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController  } from '@ionic/angular';
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
  userAuth;
  constructor(public alertController: AlertController, private formBuilder: FormBuilder, public loading: LoaderService,
    public menu: MenuController, public router:Router, public apiService : ApiService, public toastController: ToastController) {
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
    this.AddLocationForm = this.formBuilder.group({
      'tim' : [null, Validators.required],
      'kotakab' : [null, Validators.required],
      'kecamatan' : [null, Validators.required],
      'desa' : [null, Validators.required],
      'target' : [null, Validators.required],
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

  async onSubmit() {
    this.submitted = true;
    if (this.AddLocationForm.invalid) {
        return;
    }
    console.log(this.AddLocationForm.value)
    this.AddLocationForm.patchValue({
      password_confirmation : this.AddLocationForm.value.password
    })
    console.log(this.AddLocationForm.value)

    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin dengan isi data diatas?',
      buttons: [
        {
          text: 'Periksa Kembali',
          handler: () => {
            
          }
        },
       {
          text: 'Ya',
          handler: () => {
            console.log('Confirm Okay');
            this.loading.present();
            this.apiService.postDataAuth(this.AddLocationForm.value, 'add-new-location', this.userAuth['access_token']).subscribe(res => {
              console.log(res)
             if(res.status == '1'){
                this.presentToast('Anda Berhasil Menambahkan Lokasi', 'bottom')
                //console.log(res.message);
                this.router.navigate(['/dashboard'], {replaceUrl : true})
                this.loading.dismiss();
              }else if(res.status == '0'){
                this.presentToast(res.message, 'bottom')
                this.loading.dismiss();
              }
            }, (err) => {
              this.presentToast('Maaf. Terjadi kesalahan, Coba beberapa saat lagi :(', 'bottom')
              this.loading.dismiss();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async presentToast(msg, positions) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: positions
    });
    toast.present();
  }

  get f() { return this.AddLocationForm.controls; }


}
