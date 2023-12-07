import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective implements OnInit {
  @Input() disabled: boolean = false;
  @Input() captchaValue: string = '';
  @Output() captchaResolved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() regenerarButtonLabel: string = 'Regenerar';
  @Input() validarButtonLabel: string = 'Validar';

  private captchaCode: string = this.generateCaptchaCode(6);

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.drawCaptcha();
  }

  private drawCaptcha() {
    const captchaContainer = this.el.nativeElement;

    this.renderer.setProperty(captchaContainer, 'innerHTML', '');
    this.renderer.setProperty(captchaContainer, 'id', 'captchaContainer');

    const canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvas, 'width', '150');
    this.renderer.setAttribute(canvas, 'height', '50');
    this.renderer.setAttribute(canvas, 'id', 'captchaCanvas');
    this.renderer.appendChild(captchaContainer, canvas);

    const ctx = canvas.getContext('2d');

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

    const refreshButton = this.renderer.createElement('button');
    this.renderer.setProperty(refreshButton, 'innerText', this.regenerarButtonLabel);
    this.renderer.setAttribute(refreshButton, 'id', 'captchaRefreshButton');
    this.renderer.listen(refreshButton, 'click', () => this.refreshCaptcha());
    this.renderer.appendChild(captchaContainer, refreshButton);

    const validateButton = this.renderer.createElement('button');
    this.renderer.setProperty(validateButton, 'innerText', this.validarButtonLabel);
    this.renderer.setAttribute(validateButton, 'id', 'captchaValidateButton');
    this.renderer.listen(validateButton, 'click', () => this.validateCaptcha());

    const buttonContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(buttonContainer, 'id', 'captchaButtonContainer');
    this.renderer.appendChild(buttonContainer, refreshButton);
    this.renderer.appendChild(buttonContainer, validateButton);
    this.renderer.appendChild(captchaContainer, buttonContainer);
  }

  private refreshCaptcha() {
    if (!this.disabled) {
      this.captchaCode = this.generateCaptchaCode(6);
      this.drawCaptcha();
    }
  }

  private validateCaptcha() {
    if (this.captchaValue == this.captchaCode) {
      this.captchaResolved.emit(true);
    } else {
      this.captchaResolved.emit(false);
    }
  }

  private generateCaptchaCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaCode = '';

    for (let i = 0; i < length; i++) {
      captchaCode += characters[Math.floor(Math.random() * characters.length)];
    }

    return captchaCode;
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
