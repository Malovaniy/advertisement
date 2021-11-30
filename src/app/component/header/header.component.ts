import { Component, OnInit } from '@angular/core';
import { IBoard } from 'src/app/shared/interface/board.interface';
import { BoardService } from 'src/app/shared/services/board/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public field!: string;
  public arrAdvertisement!: Array<IBoard>

  constructor(
    private boardServices: BoardService,
  ) { }

  ngOnInit(): void {
    this.loadAdvertisement()
  }

  search(): void {
    this.boardServices.searchValv(this.field)
  }

  loadAdvertisement(): void {
    this.boardServices.getAll().subscribe(e => {
      this.arrAdvertisement = e
    }, err => {
      console.log(err);
    })
  }

  modalCall(): void {
    this.boardServices.modalCalled()
  }


}
