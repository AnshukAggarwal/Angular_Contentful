import { EventEmitter, Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient = createClient({
    space: environment.CONFIG.space,
    accessToken: environment.CONFIG.accessToken
  });

  errorMessage = new EventEmitter<string>()

  constructor() { }

  getCars(query?: Object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type:"cars"
    },query))
    .then(res=>res.items)
  }

  // getCarByID(id:any):Promise<Entry<any>>{
  //   return this.cdaClient.getEntries(Object.assign({
  //     content_type:"cars"
  //   },{'sys.id':id}))
  //     .then(res=>res.items[0])
  // }

  async getIndexOfCurrentCar(id){
    const myArray= await this.getCars()
    //const res = await this.cdaClient.getEntry(id);
    return myArray.findIndex(res=> res.sys.id===id)
  }

  async getCarByID(id:any):Promise<Entry<any>>{
    const res = await this.cdaClient.getEntry(id);
    return res;
  }

  async getNextCar(index){
    const myArray= await this.getCars()
    if(index=== myArray.length-1){
      //this.errorMessage.emit('You have reached the last car. Kindly click on Back to List')
      const item= myArray[0]
      //console.log(item.sys.id);
      const res= await this.getCarByID(item.sys.id)
      return res;
    }else{
    const item= myArray[index+1]
    const res= await this.getCarByID(item.sys.id)
    return res;
    }
    
  }

}
