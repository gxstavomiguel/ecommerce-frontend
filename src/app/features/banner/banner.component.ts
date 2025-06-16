import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit, OnDestroy {

  indiceAtual = 0;
  intervalo!: ReturnType<typeof setInterval>;
  readonly INTERVAL_TIME = 5000;

  imagesBanner = [
    { image : 'img1.jpg'},
    { image : 'img2.jpg'},
    { image : 'img3.jpg'},
  ];

  ngOnInit(){
    this.iniciarCarrossel();
  }

  ngOnDestroy(){
    clearInterval(this.intervalo);
  }

  iniciarCarrossel(){
    this.intervalo = setInterval(() => {
      this.forward();
    }, this.INTERVAL_TIME);
  }

  get imagemAtual(){
    return this.imagesBanner[this.indiceAtual].image;
  }

  back(){
    this.indiceAtual = (this.indiceAtual - 1 + this.imagesBanner.length) % this.imagesBanner.length;
  }

  forward(){
    this.indiceAtual = (this.indiceAtual + 1) % this.imagesBanner.length;
  }
  
}
