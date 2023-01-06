import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {ICurrentAccount} from "../interfaces/ICurrentAccount";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}
  public create(data: IAccount): Observable<ICurrentAccount> {
    return this.httpClient.post("http://localhost:8008/api/account", data) as Observable<ICurrentAccount>;
  }
  public login(email: string, password: string): Observable<ICurrentAccount> {
    return this.httpClient.get(`http://localhost:8008/api/account?email=${email}&password=${password}`) as Observable<ICurrentAccount>;
  }


}