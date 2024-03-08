import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription, interval} from 'rxjs'
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  private firstObsSubscription!: Subscription;

  constructor() {
    
  }

  ngOnInit(): void {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable((observer) => {
      let count: number = 0;
      window.setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete()
        }
        if (count > 3) {
          observer.error(new Error('Counting higher than 3! Aborting...'));
        }
        count++;
      }, 1000) 
    }
    )
    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {return data > 0}), map((data: number) => {return 'Round: ' + data})).subscribe((data) => {
      console.log(data)
    }, (error: Error) => {
      console.log(error)
      window.alert(error.message)
    },() => {
      console.log('Counted to 2 successfully!')
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
