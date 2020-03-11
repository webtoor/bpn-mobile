import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { LoaderService } from '../../service/loader.service';

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
  NamaPelaksanaIsEnabled = true;
  PHNamaPelaksana =  'Contoh : PT. Digital Imaging Geospasial';

  constructor(private formBuilder: FormBuilder, public loading: LoaderService,
    public menu: MenuController, public router:Router, public apiService : ApiService, public toastController: ToastController) {
    this.menu.enable(false);
    this.registerForm = this.formBuilder.group({
      'tipe_pelaksana' : [null, [Validators.required]],
      'pelaksana' : [null, [Validators.required]],
      'fullname' : [null, [Validators.required]],
      'tim' : [null, Validators.required],
      'kotakab' : [null, Validators.required],
      'kecamatan' : [null, Validators.required],
      'desa' : [null, Validators.required],
      'target_pbt' : [null, Validators.required],
      'target_shat' : [null, Validators.required],
      'target_k4' : [null, Validators.required],
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
    if(this.registerForm.value['tipe_pelaksana'] == '3'){
      this.registerForm.patchValue({
        pelaksana : 'ASN',
      })
    }
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
 
    this.registerForm.patchValue({
      password_confirmation : this.registerForm.value.password
    })
    console.log(this.registerForm.value)
    this.loading.present();
    this.apiService.register(this.registerForm.value, 'register').subscribe(res => {
      console.log(res)
      if(res.status == "1"){
        this.presentToast('Terima Kasih, Anda berhasil Register', 'top')
        this.router.navigate(['/login'], {replaceUrl : true})
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
    }, (err) => {
      this.presentToast("Terjadi Kesalahan, silakan coba lagi nanti :(", "bottom");
      this.loading.dismiss();
    });
  }

  NamaPelaksana(event){
    if(event.detail.value == '3'){
      this.NamaPelaksanaIsEnabled = true;
      this.PHNamaPelaksana = 'ASN'
      console.log(event.detail.value)
    }else{
      this.NamaPelaksanaIsEnabled = false;
      this.PHNamaPelaksana = 'Contoh : PT. Digital Imaging Geospasial'
      console.log(event.detail.value)
    }

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
        //console.log(res)
        this.loading.dismiss();

      }
      
     
     }, (err) => {
      this.presentToast("Terjadi Kesalahan, silakan coba lagi nanti :(", "bottom");

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

  loginPage(){
    this.router.navigate(['/login' ], {replaceUrl: true});
  }

  tutorial(){
    console.log('tutorial');
    window.open("https://www.youtube.com/watch?v=4gRDWY52n_U");

  }

}
