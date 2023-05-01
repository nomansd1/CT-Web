import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseUrl = '../components/login/';
  constructor() {}

  public async getData(url:string) {
    const response = await axios.get(url);
    return response.data;
  }
}