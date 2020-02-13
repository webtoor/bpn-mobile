import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../service/loader.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  ReportForm: FormGroup;
  submitted = false;
  userAuth;
  locations;
  constructor(public router:Router, public toastController: ToastController, public alertController: AlertController, public formBuilder: FormBuilder, public loading: LoaderService, public menu : MenuController, public apiService : ApiService) {
    this.menu.enable(true);
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
    this.ReportForm = this.formBuilder.group({
      'dtreport' : [null, Validators.required],
      'lokasi' : [null, [Validators.required]],
      'terukur' : [null, Validators.required],
      'tergambar' : [null, Validators.required],
      'k4' : [null, Validators.required],
      'pemberkasan' : [null, Validators.required],
      'aplikasi_fisik_pbt' : [null, Validators.required],
      'aplikasi_fisik_k4' : [null, [Validators.required]],
      'aplikasi_fisik_yuridis' : [null, Validators.required],
      'keterangan' : null
    });
   }

  get f() { return this.ReportForm.controls; }


  ngOnInit() {
    this.getLocation();
  }

/*   RadioLocation(event) {
    this.ReportForm.patchValue({
      lokasi : event.detail.value
    })
    } */

  getLocation(){
    this.apiService.getDataAuth('get-location', this.userAuth['access_token']).subscribe(res => {
     console.log(res)
      if(res['status'] == "1"){
        this.locations = res['data']
      
        //console.log(this.kotakab)
      }
    
    }, (err) => {
 
    });
  }

  async  onSubmit() {
    this.submitted = true;
    if (this.ReportForm.invalid) {
        return;
    }
    this.ReportForm.patchValue({
      dtreport : formatDate(this.ReportForm.value.dtreport,'yyyy-MM-dd', 'en'),
    })
    console.log(this.ReportForm.value)
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
            this.apiService.postDataAuth(this.ReportForm.value, 'report', this.userAuth['access_token']).subscribe(res => {
              console.log(res)
             if(res.status == '1'){
                this.presentToast('Submit Laporan Berhasil, Terimakasih atas Laporan Anda', 'bottom')
                //console.log(res.message);
                window.location.reload();
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

  addLocation(){
    this.router.navigate(['/dashboard/add-location'], {replaceUrl : true})
  }

}
