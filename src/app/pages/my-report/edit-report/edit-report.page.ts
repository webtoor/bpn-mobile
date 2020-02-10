import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
/* import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.page.html',
  styleUrls: ['./edit-report.page.scss'],
})
export class EditReportPage implements OnInit {
  //EditReportForm: FormGroup;
  submitted = false;
  userAuth;
  editReport
  constructor(private router:Router, public apiService : ApiService, /* private formBuilder: FormBuilder */) {
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
   }

  ngOnInit() {
    this.getSingleReport()
  }

  getSingleReport(){
    this.apiService.getDataAuth('single-report/' + 8, this.userAuth['access_token']).subscribe(res => {
     console.log(res)
      if(res['status'] == "1"){
        this.editReport = res['data'];
      }
    
    }, (err) => {
 
    });
  }

}
