import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userAuth;
  locations;
  constructor(public menu : MenuController, public apiService : ApiService) {
    this.menu.enable(true);
    const data = JSON.parse(localStorage.getItem('authBPN'));
    this.userAuth = data;
   }

  ngOnInit() {
    this.getLocation();
  }

  getLocation(){
    this.apiService.getDataAuth('get-location', this.userAuth['access_token']).subscribe(res => {
     console.log(res)
      if(res['status'] == 1){
        this.locations = res['data']
      
        //console.log(this.kotakab)
      }
    
    }, (err) => {
 
    });
  }

}
