import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

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

  constructor(private formBuilder: FormBuilder,
    public menu: MenuController, public router:Router, public apiService : ApiService) {
    this.menu.enable(false);
    this.registerForm = this.formBuilder.group({
      'pelaksana' : [null, [Validators.required, Validators.email]],
      'tim' : [null, Validators.required],
      'kotakab' : [null, Validators.required],
      'kecamatan' : [null, Validators.required],
      'desa' : [null, Validators.required],
      'password' : [null, Validators.required],
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



}
