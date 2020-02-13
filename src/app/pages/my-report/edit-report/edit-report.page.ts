import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.page.html',
  styleUrls: ['./edit-report.page.scss'],
})
export class EditReportPage implements OnInit {
  EditReportForm: FormGroup;
  submitted = false;
  userAuth;
  editReport;
  report_id;
  constructor(public loading: LoaderService, public router:Router, public route : ActivatedRoute, public apiService : ApiService, private formBuilder: FormBuilder) {
    this.report_id = this.route.snapshot.paramMap.get('id');
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
    this.EditReportForm = this.formBuilder.group({
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

  ngOnInit() {
    this.getSingleReport();
  }

  getSingleReport(){
    this.loading.present();
    this.apiService.getDataAuth('single-report/' + this.report_id, this.userAuth['access_token']).subscribe(res => {
     console.log(res['data']['project_location'])
      if(res['status'] == "1"){
        this.editReport = res['data']['project_location']
        this.EditReportForm.patchValue({
          'dtreport' : res['data']['dtreport'],
          'lokasi' : res['data']['project_location_id'],
          'terukur' : res['data']['terukur'],
          'tergambar' : res['data']['tergambar'],
          'k4' : res['data']['k4'],
          'pemberkasan' : res['data']['pemberkasan'],
          'aplikasi_fisik_pbt' : res['data']['aplikasi_fisik_pbt'],
          'aplikasi_fisik_k4' : res['data']['aplikasi_fisik_k4'],
          'aplikasi_fisik_yuridis' : res['data']['aplikasi_fisik_yuridis'],
          'keterangan' : res['data']['keterangan']
        }) 
        this.loading.dismiss();
      }
    
    }, (err) => {
 
    });
  }
  get f() { return this.EditReportForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.EditReportForm.invalid) {
        return;
    }
    console.log(this.EditReportForm.value)
     
    this.apiService.postDataAuth(this.EditReportForm.value, 'single-report/' + this.report_id, this.userAuth['access_token']).subscribe(res => {
      console.log(res)
      if(res.status == "1"){
        this.router.navigate(['/my-report'], {replaceUrl: true,});
      }
     
    });

  }
}
