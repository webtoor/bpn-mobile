import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

let apiUrl = "http://127.0.0.1:8000/api/"; 
/* let apiUrl = "https://monevkanwiljabar.com/api/";  */
/* let apiUrl = "http://192.168.1.7:8000/api/";  */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient, public router : Router, public toastController: ToastController) { }
  isAuthenticated(){
    return localStorage.getItem('authBPN');
  }
  getData(type){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
      })
    };
    return this.http.get(apiUrl+type, httpOptions)
    .pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
   );
  }

  private handleError(error: Response | any) {  
    console.error(error.message || error);  
    return Observable.throw(error.status);  
  }

    register(data, type){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
    .pipe(
      
    );
  }  

  login(data, type){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
    .pipe(
      
    );
  }  

  getDataAuth(type, access_token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    };
    return this.http.get(apiUrl+type, httpOptions)
    .pipe(
      map(res => {
        if(res['status'] == 401){
          this.presentToast('Access Token Invalid, Silakan Login Kembali', "bottom")
          localStorage.clear();
          this.router.navigate(['login'], {replaceUrl : true})
        }
        return res
      }),
      catchError(this.handleError)
   );
  }

  postDataAuth(data, type, access_token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
    .pipe(
      map(res => {
        if(res['status'] == 401){
          this.presentToast('Access Token Invalid, Silakan Login Kembali', "bottom")
          localStorage.clear();
          this.router.navigate(['login'], {replaceUrl : true})
        }
        return res
      })
    );
  }  

  async presentToast(msg, positions) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: positions
    });
    toast.present();
  }
}
