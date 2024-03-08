import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'observables-ACG';
  isActivated: boolean = false;
  subjectSubscription: Subscription

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.subjectSubscription = this.userService.activatedEmitter.subscribe((didActivate: boolean) => {
      this.isActivated = didActivate;
    })
  }

  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();    
  }

}
