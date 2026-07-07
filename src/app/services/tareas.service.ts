import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private http = inject(HttpClient);

  // El frontend se sirve por nginx y enruta /api/* hacia el backend
  // dentro del cluster Kubernetes usando DNS interno.
  readonly baseUrl = '/api';

  listar(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.baseUrl}/tareas`);
  }

  crear(titulo: string): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.baseUrl}/tareas`, { titulo });
  }

  actualizar(id: number, cambios: Partial<Tarea>): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.baseUrl}/tareas/${id}`, cambios);
  }

  eliminar(id: number): Observable<Tarea> {
    return this.http.delete<Tarea>(`${this.baseUrl}/tareas/${id}`);
  }
}
