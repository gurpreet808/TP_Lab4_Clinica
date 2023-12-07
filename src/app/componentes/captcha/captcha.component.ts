import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  userInput: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  handleCaptchaResolved(isValid: boolean): void {
    console.log('Captcha Resolved:', isValid);
  }

}