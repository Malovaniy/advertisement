import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBoard } from 'src/app/shared/interface/board.interface';
import { BoardService } from 'src/app/shared/services/board/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public field!: string
  public ismodalCall = false;
  public advertForm!: FormGroup;
  public arrAdvertisement!: Array<IBoard>
  public isEdit = false
  public uid!: string
  
  constructor(
    private boardServices: BoardService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadAdvertisement()
    this.loadModal()
    this.initAdvertForm()
    this.search()
  }

  loadAdvertisement(): void {
    this.boardServices.getAll().subscribe(e => {
      this.arrAdvertisement = e as Array<IBoard>
    }, err => {
      console.log(err);
    })
  }
  
  initAdvertForm(): void {
    this.advertForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: new Date().toISOString()
    })
  }

  addAdvert(): void {
    if (this.advertForm.valid) {
      this.advertForm.patchValue({date: new Date().toISOString()});
      this.boardServices.create(this.advertForm.value).then(() => {
        this.loadAdvertisement()
        this.initAdvertForm()
        this.modalExit()
      }).catch(err=>{
        console.log(err);
      })
    }
    else {
      alert('Заповніть поля!')
    }
  }

  delete(id: string): void {
    this.boardServices.delete(id).then(() => {
      this.loadAdvertisement()
    }).catch(err=>{
      console.log(err);
    })
  }

  edit(item: IBoard): void {
    this.isEdit = true
    this.uid = item.id
    this.advertForm.patchValue({
      description: item.description,
      name: item.name,
      date: new Date().toISOString(),
    });
    if (this.isEdit) {
      this.modalCall()
      this.loadModal()
    }
  }

  saveChanges(): void {
    if (this.advertForm.valid) {
      this.boardServices.update(this.advertForm.value, this.uid).then(() => {
        this.loadAdvertisement()
        this.initAdvertForm()
        this.modalExit()
      }).catch(err=>{
        console.log(err);
      })
    }
    else {
      alert('Заповніть поля!')
    }
  }

  loadModal(): void {
    this.boardServices.isModal$.subscribe(e => {
      this.ismodalCall = e
    })
  }

  modalCall(): void {
    this.boardServices.modalCalled()
    this.loadModal()
  }

  modalExit(): void {
    this.isEdit = false
    this.boardServices.modalExit()
    this.loadModal()
    this.advertForm.reset()
  }

  search(): void {
    this.boardServices.field$.subscribe(e => {
      this.field = e
    })
  }
}
