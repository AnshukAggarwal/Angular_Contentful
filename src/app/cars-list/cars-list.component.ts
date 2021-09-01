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
  queryString:string="";

  constructor(private contentfulService: ContentfulService){}

  ngOnInit(){
    this.contentfulService.getCars()
    .then(data=>{
      //console.log(data)
      this.cars=data
    })
  }

  filterCars(){
    if(this.queryString===""){
      this.ngOnInit();
    }
    this.cars= this.cars.filter(car=> car.fields.model.toLowerCase() === this.queryString.toLowerCase() || car.fields.make.toLowerCase() === this.queryString.toLowerCase())
  }
  

}
