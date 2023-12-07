import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { Image } from 'src/app/common/image';
@Component({
  selector: 'app-mainscreen-body',
  templateUrl: './mainscreen-body.component.html',
  styleUrls: ['./mainscreen-body.component.css'],
  animations: [trigger("fade", [  // fade animation
  state("void", style({ opacity: 0 })),
  transition("void <=> *", [animate("0.5s ease-in-out")])
  ])]
})
export class MainscreenBodyComponent implements OnInit {

  images: Image[] = [];
  currImage: Image = new Image("#", "#");
  currIndex: number = 0;

  countDownDate: Date = new Date();
  endDate: Date = new Date("June 9, 2024 17:00:00");

  dayS: string = "";
  hourS: string = "";
  minuteS: string = "";
  secondS:  string = "";

  day: number = this.countDownDate.getDay();
  hour: number = this.countDownDate.getHours();
  minute: number = this.countDownDate.getMinutes();
  second: number = this.countDownDate.getSeconds();

  constructor() { 

  }

  ngOnInit(): void {
    this.images.push(new Image("../../assets/Images/_DSC3985.JPG", "Flower Shop"))
    this.images.push(new Image("../../assets/Images/_DSC4361.JPG", "Walking away"))
    this.images.push(new Image("../../assets/Images/_DSC4386.JPG", "Ethan"))
    this.images.push(new Image("../../assets/Images/_DSC4403 (1).JPG", "Stair looking at each other"))
    this.currImage = this.images[0];

    const diff = this.endDate.getTime() - this.countDownDate.getTime();

    this.day = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.second = Math.floor((diff % (1000 * 60)) / 1000);

    //count down clock
    setInterval(()=> {

      
      
      
      if (this.hour == 0 && this.minute == 0 && this.second == 0 && this.day == 0) {
      }  else {
        this.second -= 1;

      if (this.hour == 0 && this.minute == 0 && this.second == 0) {
        this.day -= 1;
        this.hour = 23;
      }
      if (this.minute == 0 && this.second == 0) {
        this.minute = 59;
        this.hour -= 1;
      }
      if (this.second == 0) {
        this.minute -= 1;
        this.second = 60;
      }

      if (this.second - 10 < 0) {
        this.secondS = this.second.toString().padStart(2, "0");
      } else {
        this.secondS = this.second.toString();
      }

      if (this.minute - 10 < 0) {
        this.minuteS = this.minute.toString().padStart(2, "0");
      } else {
        this.minuteS = this.minute.toString();
      }

      if (this.hour - 10 < 0) {
        this.hourS = this.hour.toString().padStart(2, "0");
      } else {
        this.hourS = this.hour.toString();
      }

      if (this.day - 100 < 0) {
        this.dayS = this.day.toString().padStart(3, "0");
      } else {
        this.dayS = this.day.toString();
      } 
    }
    }, 1000);

    //image auto scroller
    setInterval(() => {
      this.currIndex += 1;
      const lastIndex = this.currIndex - 1;
      if (this.currIndex >= this.images.length) {
        this.currIndex = 0;
        this.currImage = this.images[this.currIndex];
      } else {
        this.currImage = this.images[this.currIndex];      }


    }, 8000);
  }

  public nextImage() {
    this.currIndex += 1;
    const lastIndex = this.currIndex - 1;
    if (this.currIndex >= this.images.length) {
      this.currIndex = 0;
      this.currImage = this.images[this.currIndex];
    } else {
      this.currImage = this.images[this.currIndex];
    }


  }

  public lastImage() {
    this.currIndex -= 1;
    const lastIndex = this.currIndex + 1;
    if (this.currIndex < 0) {
      this.currIndex = this.images.length - 1;
      this.currImage = this.images[this.currIndex];
    } else {
      this.currImage = this.images[this.currIndex];
    }
    
    }

  public currentSlide(image: Image) {
    let imgIndex = 0;
    for (let img of this.images) {
      if (img == image) {
        break;
      } else {
        imgIndex += 1;
      }
    }
  

    this.currIndex = imgIndex;
    this.currImage = image;
  }


}
