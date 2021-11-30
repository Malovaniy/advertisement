import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBoard } from '../../interface/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public isModal$ = new Subject<boolean>();
  public field$ = new Subject<string>();
  private url = environment.BACKEND;
  private api = { advertisement: `${this.url}/advertisement` };

  constructor(private http: HttpClient) { }

  searchValv(str: string):void{
    this.field$.next(str)
  }

  modalCalled(): void{
    this.isModal$.next(true)
  }

  modalExit():void{
    this.isModal$.next(false)
  }

  getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.api.advertisement);
  }

  getOne(id: number): Observable<IBoard> {
    return this.http.get<IBoard>(`${this.api.advertisement}/${id}`);
  }

  create(advertisement: IBoard): Observable<void> {
    return this.http.post<void>(this.api.advertisement, advertisement);
  }

  update(advertisement: IBoard, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.advertisement}/${id}`, advertisement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.advertisement}/${id}`);
  }

}


