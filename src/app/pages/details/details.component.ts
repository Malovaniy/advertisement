import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBoard } from 'src/app/shared/interface/board.interface';
import { BoardService } from 'src/app/shared/services/board/board.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public arrAdverts: Array<IBoard> = []
  public routeId!: string
  public analogAdvers: Array<IBoard> = []
  public advert!: Array<IBoard>

  constructor(
    private boardServices: BoardService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute()
    this.loadAllAdvert()
  }

  ngDoCheck(): void {
    this.activeRoute()
  }
  
  activeRoute():void{
    this.routeId = this.activatedRoute.snapshot.params.details
  }

  loadAllAdvert(): void {
    this.boardServices.getAll().subscribe(e => {
      this.arrAdverts = e as Array<IBoard>
      this.filterAdv()
    }, err => {
      console.log(err);
    })
  }

  filterAdv() {
    this.analogAdvers = []
    this.advert = this.arrAdverts.filter(el => el.id == this.routeId)
    this.arrAdverts.filter((el, i) => {
      this.advert[0]?.name.toLowerCase().split(` `).forEach(e => {
        if (el?.name.toLowerCase().split(` `).includes(e)) {
          if (el.id !== this.advert[0].id) this.analogAdvers.push(el);
        }
      })
    })
  }

  refresh(): void {
    this.loadAllAdvert()
  }
}




