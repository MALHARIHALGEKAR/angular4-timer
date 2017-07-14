import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
    nextHour: number = 1;
    nextMinute: number = 1;
    nextSecond: number = 1;
    prevHour: number = 12;
    prevMinute: number = 60;
    prevSecond: number = 60;
    showTimerErr = false;
    time: any = {hour: 0,minute: 0,second: 0};

  constructor() { console.log('this.nextSecond   '+this.nextSecond+'  this.time.second  '+this.time.second+'  this.prevSecond '+this.prevSecond)}
    
    getHour(hour: Event) {
      console.log("hour  " + hour)
      this.time.hour = Number(hour);
      if(this.time.hour == 0){
        this.prevHour = 12;
        this.nextHour = this.time.hour + 1;
      }else{
        this.nextHour = this.time.hour + 1;
          this.prevHour = this.time.hour - 1;
      }  
    }
    getMinute(minute: Event) {
      console.log("minute  " + minute)
      this.time.minute = Number(minute);
      if(this.time.minute == 0){
        this.nextMinute = this.time.minute + 1;
        this.prevMinute = 60;
      }else{
        this.nextMinute = this.time.minute + 1;
        this.prevMinute = this.time.minute - 1;
      }
    }
    getSecond(second: Event) {
      console.log("second  " + second)
      this.time.second = Number(second);
      if(this.time.second == 0){
        this.nextSecond = this.time.second + 1;
        this.prevSecond = 60;
      }else{
        this.nextSecond = this.time.second + 1;
        this.prevSecond = this.time.second - 1;
      }
    }
    getNextHour() {
      this.nextHour++;
      this.prevHour++;
      this.time.hour = this.nextHour - 1;
      // if (this.nextHour >= 13) {
      //   this.nextHour = 0;
      // }
      // if (this.prevHour >= 13) {
      //   this.prevHour = 0;
      // }
    }
    getNextMinute() {
      this.nextMinute++;
      this.prevMinute++;
      this.time.minute = this.nextMinute - 1;
      if (this.nextMinute >= 61) {
        this.nextMinute = 0;
        this.time.minute = this.nextMinute;
        this.getNextHour();
      }
      if (this.prevMinute >= 61) {
        this.prevMinute = 0;
      }
    
    }
    getNextSecond() {
      // this.nextSecond++;
      // this.prevSecond++;
      // this.time.second = this.nextSecond - 1;
      // if (this.nextSecond >= 61) {
      //    this.nextSecond = 0;
      //    this.time.second = this.nextSecond;
      //   this.getNextMinute()
      // }
      // if (this.prevSecond >= 61) {
      //   this.prevSecond = 0;
      // }
    if(this.time.second >= 59){
        this.time.second = 0;
     }else{
        this.time.second++;
     }

      console.log('this.nextSecond   '+this.nextSecond+'  this.time.second  '+this.time.second+'  this.prevSecond '+this.prevSecond)
    }
    getPrevHour(){
      this.nextHour--;
      this.prevHour--;
      if (this.nextHour < 0) {
        this.nextHour = 12;
      }
      if (this.prevHour < 0) {
        this.prevHour = 12;
      }
      if(this.prevHour == 12){
        this.time.hour = 0;
      }else{
        this.time.hour = this.prevHour+1;
      }
    
    }
    getPrevMinute(){
      this.nextMinute--;
      this.prevMinute--;
      if (this.nextMinute < 0) {
        this.nextMinute = 60;
      }
      if (this.prevMinute < 0) {
        this.prevMinute = 60;
      }
      if(this.prevMinute == 60){
        this.time.minute = 0;
      }else{
        this.time.minute = this.prevMinute+1;
      }
    }
    getPrevSecond(){
      // this.nextSecond--;
      // this.prevSecond--;
      // if (this.nextSecond < 0) {
      //   this.nextSecond = 59;
      // }
      // if (this.prevSecond < 0) {
      //   this.prevSecond = 59;
      //   this.time.second = this.prevSecond
      // }
      // if(this.prevSecond == 60){
      //   this.time.second = 0;
      // }else{
      //   this.time.second = this.prevSecond;
      // }
     if(this.time.second <= 0){
       this.time.second = 59;
     }else if(this.time.second >= 60){
        this.time.second = 0;
     }else{
        this.time.second--;
     }

      console.log('this.nextSecond   '+this.nextSecond+'  this.time.second  '+this.time.second+'  this.prevSecond '+this.prevSecond)
    }
    getMeTime(){
      localStorage.setItem('timerData',JSON.stringify(this.time));
    }


  ngOnInit() {
  }

}
