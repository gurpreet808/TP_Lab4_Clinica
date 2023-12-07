import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  @ViewChild('captchaCanvas') captchaCanvas!: ElementRef<HTMLCanvasElement>;
  private captchaCode: string = this.generateCaptchaCode(6);

  constructor() {
    this.refreshCaptcha();
  }

  ngOnInit() {
    this.refreshCaptcha();
  }

  refreshCaptcha() {
    this.captchaCode = this.generateCaptchaCode(6);
    this.drawCaptcha();
  }

  private generateCaptchaCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaCode = '';

    for (let i = 0; i < length; i++) {
      captchaCode += characters[Math.floor(Math.random() * characters.length)];
    }

    return captchaCode;
  }

  private drawCaptcha() {
    if (this.captchaCanvas) {
      const canvas = this.captchaCanvas.nativeElement;
      const ctx = canvas.getContext('2d');

      if (ctx != null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = 'blur(1px)';

        ctx.fillStyle = '#f2f2f2'; // Color de fondo del canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#333'; // Color del texto
        ctx.font = '30px Arial';
        ctx.fillText(this.captchaCode, 10, 30);

        ctx.strokeStyle = '#888'; // Color de las líneas
        ctx.fillStyle = '#888'; // Color de los puntos

        for (let i = 0; i < 35; i++) {
          this.drawLine(ctx, canvas);
        }

        for (let i = 0; i < 35; i++) {
          this.drawDot(ctx, canvas);
        }
      }
    }
  }

  private drawLine(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  private drawDot(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 5,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
}