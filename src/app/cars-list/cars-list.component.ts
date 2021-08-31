import { Component, OnInit } from '@angular/core';
import { Entry } from "contentful"
import { ContentfulService } from '../contentful.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  cars: Entry<any>[]=[];

  constructor(private contentfulService: ContentfulService){}

  ngOnInit(){
    this.contentfulService.getCars()
    .then(data=>{
      //console.log(data)
      this.cars=data
    })
  }

}
