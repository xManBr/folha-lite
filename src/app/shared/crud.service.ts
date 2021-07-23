import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ReciboInterface } from '../interface/recibo.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL) {

  }
  private create(register: T) {
    return this.http.post(this.API_URL, register).pipe(take(1));
  }

  private update(register: T) {
    return this.http.put(`${this.API_URL}/${register['id']}`, register).pipe(take(1));
  }

  save(record: T) {
    if (record['id']) {
      return this.update(record);
    }
    return this.create(record);
  }

  calcularRescisao(record: T) {
    return this.http.post<ReciboInterface>(`${this.API_URL}Rescisao`, record).pipe(take(1));
  }
  calcularSalarioLiquido(record: T) {
    return this.http.post<ReciboInterface>(`${this.API_URL}SalarioLiquido`, record).pipe(take(1));
  }
  calcularFerias(record: T) {
    return this.http.post<ReciboInterface>(`${this.API_URL}Ferias`, record).pipe(take(1));
  }
  calcularDecimoTerceiro(record: T) {
    return this.http.post<ReciboInterface>(`${this.API_URL}DecimoTerceiroSalario`, record).pipe(take(1));
  }

}
