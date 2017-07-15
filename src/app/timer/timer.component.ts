import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
    time: any = {hour: 0,minute: 0,second: 0};

  constructor() {}
    
    getHour(hour: Event) {
      this.time.hour = Number(hour);
      if(this.time.hour < 0){
        this.time.hour = 0;
      }
    }
    getMinute(minute: Event) {
      this.time.minute = Number(minute);
     if(this.time.minute > 59 || this.time.minute < 0){
        this.time.minute = 0;
      }
    }
    getSecond(second: Event) {
      this.time.second = Number(second);
      if(this.time.second > 59 || this.time.second < 0){
        this.time.second = 0;
      }
    }
    getNextHour() {
      this.time.hour++;
    }
    getNextMinute() {
      if(this.time.minute >= 59){
          this.time.minute = 0;
           this.getNextHour()
      }else{
          this.time.minute++;
      }
    }
    getNextSecond() {
      if(this.time.second >= 59){
          this.time.second = 0;
          this.getNextMinute()
      }else{
          this.time.second++;
      }
    }
    getPrevHour(){
      if(this.time.hour > 0){
          this.time.hour--;
      }
    }
    getPrevMinute(){
     if(this.time.minute <= 0){
        this.time.minute = 59;
        this.getPrevHour();
      }else if(this.time.minute >= 60){
          this.time.minute = 0;
      }else{
          this.time.minute--;
      }
    }
    getPrevSecond(){
      if(this.time.second <= 0){
        this.time.second = 59;
        if(this.time.minute > 0){
          this.getPrevMinute()
        }
      }else if(this.time.second >= 60){
          this.time.second = 0;
      }else{
          this.time.second--;
      }
    }
    getMeTime(){
      localStorage.setItem('timerData',JSON.stringify(this.time));
    }


  ngOnInit() {
  }

}
