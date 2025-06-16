import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { BannerComponent } from "./features/banner/banner.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common'; // <-- aqui!
import { HomeComponent } from './features/home/home.component';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BannerComponent, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  paginaAtual : boolean = false;

    constructor(private router: Router){
  }

  ngOnInit(): void{
    this.rotaAtual(this.router.url);

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.rotaAtual(event.urlAfterRedirects);
    })
  }

  private rotaAtual(url: string): void{
    this.paginaAtual = url === '/'
  }


}
