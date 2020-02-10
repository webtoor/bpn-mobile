import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.page.html',
  styleUrls: ['./my-report.page.scss'],
})
export class MyReportPage implements OnInit {
  userAuth;
  myReport;
  constructor(private router:Router, public apiService : ApiService) { 
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getReport()
  }

  getReport(){
    this.apiService.getDataAuth('report', this.userAuth['access_token']).subscribe(res => {
     console.log(res)
      if(res['status'] == "1"){
        this.myReport = res['data'];
      }
    
    }, (err) => {
 
    });
  }

  EditReport(id){
    this.router.navigate(['my-report/edit-report', id])
  }

}
