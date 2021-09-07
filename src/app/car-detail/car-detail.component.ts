import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from '../contentful.service';
import { Entry } from "contentful"

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  id:string;
  car:Entry<any>;
  nextCar:Entry<any>;
  message:string

  // constructor(private route:ActivatedRoute) { 
  //   this.currentCardId=this.route.snapshot.pa
  // }
  constructor(private contentfulService:ContentfulService,
    private route: ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.message= this.route.snapshot.data['message'];
    console.log(this.message)
    // console.log(this.currentCar.sys.id)
    this.route.params
    .subscribe(params=>this.id=params['id'])
    //this.id=this.route.snapshot.params['id'];
    this.contentfulService.getCarByID(this.id)
    .then(car=>{
      //console.log(car.fields.description.content[0].content[0].value)
      //console.log(car)
      this.car=car
    })
  }

  getNextCar(){
    // this.contentfulService.errorMessage
    // .subscribe(message=>this.message=message)
    this.contentfulService.getIndexOfCurrentCar(this.id)
    .then(data=>{
      //console.log(data)
      this.contentfulService.getNextCar(data)
      .then(car=>{
        this.id=car.sys.id
        this.car=car
        this.router.navigate(['/cars', car.sys.id])
      })
    })
  }

  

}
