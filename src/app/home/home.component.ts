import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { NotifierService } from 'angular-notifier';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public search: any = '';
  userlist = [];
  selecteduserrepo: any;
  loader: boolean = false;
  currentuserid = 0;
  selecreduser: any = { login: '', avatar_url: '' };
  public searchmode = false;


  constructor(public apiservice: ServiceService, public notifier: NotifierService, ) { }

  ngOnInit() {
    this.getalllist(this.currentuserid);

  }
  // get all user list
  getalllist(userid) {
    this.searchmode = false;
    this.loader = true;
    this.search = '';
    console.log('calling api')
    this.apiservice.getalllist(userid).subscribe((result: any) => {
      this.userlist = result;
      this.currentuserid = this.userlist[this.userlist.length - 1].id;
      this.loader = false;
    },
      err => {
        console.log(err);
        this.loader = false;

      })
  }
  //  load more user list data
  loadmore(userid) {
    this.searchmode = false;
    console.log(userid)
    this.loader = true;
    this.search = '';
    console.log('calling api')
    this.apiservice.getalllist(userid).subscribe((result: any) => {
      console.log(typeof (result), typeof (this.userlist))
      this.userlist = [...this.userlist, ...result]
      console.log(this.userlist)
      this.currentuserid = this.userlist[this.userlist.length - 1].id;
      this.loader = false;
    },

      err => {
        console.log(err);
        this.loader = false;

      })
  }
  // search user
  searchuser() {
    this.searchmode = true;
    var _base = this;
    if (this.search == '' || this.search == undefined) {
      this.getalllist(0);
      return;
    }
    setTimeout(function () {
      // delaying in api call to restrict lots of api call
      _base.loader = true;
      _base.apiservice.searchuser(_base.search).subscribe((result: any) => {
        _base.userlist = result.items;
        if (_base.search.length < 1) {
          _base.userlist = [];
        }
        _base.loader = false;
      },
        err => {
          console.log(err);
          _base.loader = false;
          _base.notifier.notify("error", err.error.message);
        })
    }, 1000);
  }
  // select user whose repo is to be displayed and display in modal
  select(user) {
    this.loader = true;
    this.selecreduser = user;
    console.log(this.selecreduser)
    this.apiservice.getrepo(user.login).subscribe((result: any) => {
      this.loader = false;
      console.log(result);
      this.selecteduserrepo = result
      $("#myModal").modal('show');
    },
      err => {
        console.log(err);
        this.loader = false;
      })
  }

}
