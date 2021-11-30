
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces';
import { Observable, Subject } from 'rxjs';
import { IBoard } from '../../interface/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public isModal$ = new Subject<boolean>();
  public field$ = new Subject<string>();

  constructor(
    private firestore: Firestore
    ) { }

  searchValv(str: string):void{
    this.field$.next(str)
  }

  modalCalled(): void{
    this.isModal$.next(true)
  }

  modalExit():void{
    this.isModal$.next(false)
  }
   
  getAll(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, 'advertisement'), {idField: 'id'})
  }

  create(advertisement: IBoard): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, "advertisement"), advertisement);
  }

  update(advertisement: IBoard, id: string): Promise<void> {
    return setDoc(doc(this.firestore, "advertisement", id), advertisement);
  }

  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, "advertisement", id));
  }
}


