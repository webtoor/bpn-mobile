import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router} from '@angular/router';

let apiUrl = "http://localhost:8000/api/"; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient, public router : Router) { }
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
        if (res['status'] == '5') {
          throw new Error('Value expected!');
        }
       /*  if(res['status'] == 401){
          localStorage.clear();
          this.router.navigate(['login'], {replaceUrl : true})
        } */
        //console.log(res['data'])
        return res;
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
      
    );
  }  
}
