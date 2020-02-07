import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userAuth;
  locations;
  constructor(private formBuilder: FormBuilder, public loading: LoaderService, public menu : MenuController, public apiService : ApiService) {
    this.menu.enable(true);
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
    this.registerForm = this.formBuilder.group({
      'dtreport' : [null, Validators.required],
      'location' : [null, [Validators.required]],
      'terukur' : [null, Validators.required],
      'tergambar' : [null, Validators.required],
      'kkp' : [null, Validators.required],
      'pengukuran' : [null, Validators.required],
      'pemetaan' : [null, Validators.required],
      'pbt' : [null, [Validators.required]],
      'su' : [null, Validators.required],
      'pengumuman' : [null, Validators.required],
      'pengesahan' : [null, Validators.required],
      'keterangan' : [null, Validators.required],
    });
   }

  ngOnInit() {
    this.getLocation();
  }

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

}
