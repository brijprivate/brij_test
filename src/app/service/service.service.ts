import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../config';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // get user list
  getalllist(id) {
    return this.http.get('https://api.github.com/users?since='+id)

  }

//  get user search result
  searchuser(key){
    console.log(key)
    return this.http.get('https://api.github.com/search/users?q='+key)

  }
  // get the repo of indicual user
  getrepo(username){
        return this.http.get('https://api.github.com/users/'+username+'/repos')
      }


      


}
