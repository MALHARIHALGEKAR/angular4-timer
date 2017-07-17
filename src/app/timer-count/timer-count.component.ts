import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-timer-count',
  templateUrl: './timer-count.component.html',
  styleUrls: ['./timer-count.component.css']
})
export class TimerCountComponent implements OnInit {
  subscription: Subscription;
    time:any;
    timerData:any;
    hourDisp = 0;
    SecondDisp = 0;
    minuteDisp = 0;
    unSubscribe:any;
    remainingTime = 0;
    aaa:any;
    showTimerDisp = false;

    constructor() {
    }

    getTimerForWork(){
      let data = localStorage.getItem('timerData');
      this.timerData = JSON.parse(data);
      if(this.timerData.hour != 0 || this.timerData.minute != 0 || this.timerData.second != 0){
          this.showTimerDisp = true;
      }
      let totalSeconds = (this.timerData.hour * 3600) + (this.timerData.minute * 60) + this.timerData.second;
        let newobs = Observable.interval(1000).take(totalSeconds).map(x =>x++);
          this.unSubscribe = newobs.subscribe(x =>{
            this.time = x;  
            this.remainingTime = x+1;
            this.hourDisp =  Math.floor(this.remainingTime / 3600);
            let remSec = this.remainingTime % 3600;
            this.minuteDisp =  Math.floor(remSec / 60);
            this.SecondDisp = remSec % 60;
            let emsec =  totalSeconds - (x+1); 
            this.timerData.hour = Math.floor(emsec / 3600);
            let remSec1 = emsec % 3600;
            this.timerData.minute = Math.floor(remSec1 / 60);
            this.timerData.second = remSec1 % 60;
            if(totalSeconds == x+1){
              setTimeout( ()=>{localStorage.setItem('timerData',JSON.stringify(this.timerData))}, 2000);
            }
          })
    }

     getTimerForWorkAgain(){
      let data = localStorage.getItem('timerData');
      this.timerData = JSON.parse(data);
      let totalSeconds = (this.timerData.hour * 3600) + (this.timerData.minute * 60) + this.timerData.second;
        let newobs = Observable.interval(1000).take(totalSeconds).map(x =>x++);
          this.unSubscribe = newobs.subscribe(x =>{
            this.time = x;  
            this.remainingTime = this.remainingTime + 1;
            this.SecondDisp = this.SecondDisp + 1;
            if(this.SecondDisp == 60){
              this.SecondDisp = 0;
              this.minuteDisp = this.minuteDisp + 1;
            }
            
            if(this.minuteDisp == 60){
              this.minuteDisp = 0;
              this.hourDisp = this.hourDisp + 1;
            }

            let emsec =  totalSeconds - (x+1); 
            this.timerData.hour = Math.floor(emsec / 3600);
            let remSec1 = emsec % 3600;
            this.timerData.minute = Math.floor(remSec1 / 60);
            this.timerData.second = remSec1 % 60;
            if(totalSeconds == x+1){
              setTimeout( ()=>{localStorage.setItem('timerData',JSON.stringify(this.timerData))}, 2000);
            }
          })
    }

    pauseMe(){
       localStorage.setItem('timerData',JSON.stringify(this.timerData));
       this.unSubscribe.unsubscribe();     
       let data = {'part':'','type':'practicePauseme'};
      
    }
    resumeMe(){
         this.getTimerForWorkAgain(); 
         let data = {'part':'','type':'practiceResume'};
        
    }

    endTheTest(){
      this.unSubscribe.unsubscribe();
      let time = {hour: 0,minute: 0,second: 0};
      localStorage.setItem('timerData',JSON.stringify(time));
      // this.updateTimeReq();
      let part = localStorage.getItem('part');
      let data = {'part':part,'type':'practicetest'};
    }

    // updateTimeReq(){
    //   let end_p = 'random_tests/update_time';
    //   let access_token = localStorage.getItem('access_token');
    //   let randomId = localStorage.getItem('randomId');
    //   let setTime = localStorage.getItem('TotaltimeSet');
    //   let remTime = localStorage.getItem('remainingTime');
    //   let URL = '?access_token='+access_token;
    //       let form = {'random_test_id':randomId,'set_time':setTime,'time_took':remTime};
    //       this.upReqService.updateDataRequest(end_p,URL,form).subscribe(result => {
    //           let data = result;
    //       },err => {
    //     if(err){
    //       let data={'type':'apierror',};
    //     }
    // })  
    // }

    // pauser = new Subject();
    // event=10;
    
    //   getTimerForWorkaa(){
    //    console.log('hi i am working');
    //    let data = localStorage.getItem('timerData');
    //    this.timerData = JSON.parse(data);
    //    console.log("nnnnnnnn "+JSON.stringify(this.timerData));
    //    let totalSeconds = (this.timerData.hour * 3600) + (this.timerData.minute * 60) + this.timerData.second;

    //    this.pauser = new Subject();
    //     var source = Observable
    //       .interval(1000)
    //       .timeInterval()
    //       .map(function (x) { return x.value + ':' + x.interval; })
    //       .share()
    //       .take(this.event);

    //     const pausable = this.pauser.switchMap(paused => paused ? Observable.never() : source);
    //     let aa = pausable.subscribe(x => console.log(x));

    //   this.pauser.next(false);
          
    //  }

    //  pauseMe(){
    //     this.pauser.next(true);
    //  }
    //   resumeMe(){
    //     this.event=5;
    //     this.pauser.next(false);
    //  }
    ngOnInit() {
       this.getTimerForWork();
    }
    ngOnDestroy(){
      let time = String(this.remainingTime);
      localStorage.setItem('remainingTime',time);
      let part = localStorage.getItem('part');
      let data = {'part':part,'type':'practicetest'};
     
    }

}
