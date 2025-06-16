import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private map = {
    'PS5' : 'play5.png',
    'Xbox Series X': 'xboxx.png',
    'Nintendo Switch': 'switch1.png',
    'Nintendo Switch 2': 'switch2.png',
    'Xbox Series S': 'xboxs.png',
    'Xbox 360' : 'xbox360.png',
    'PS4' : 'ps4.png',
    'PSVITA' : 'psvita.png',
    'Monitor 24"': 'monitor2.png',
    'Monitor 27"': 'monitor.png',
    'Controle PS5' : 'controle.png',
    'Teclado Redragon 60%' : 'teclado1.png',
    'Teclado Redragon Custom' : 'teclado2.png',
    'CPU Ryzen 5' : 'cpu1.png',
    'Mouse Redragon Cobra' : 'mouse1.png'
  };

  getImagem(nome : string): string {
    return this.map[nome as keyof typeof this.map];
  }
}
