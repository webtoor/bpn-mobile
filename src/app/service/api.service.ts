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
}
