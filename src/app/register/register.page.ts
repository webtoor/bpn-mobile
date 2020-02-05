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
        console.log(this.kotakab)
      }
    
    }, (err) => {
 
    });
  }



}
