import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/usuario/';

  post(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario);
  }

  put(id: number, usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiUrl}${id}`, usuario);
  }

  getAll() {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  getById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
