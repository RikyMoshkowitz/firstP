import { Injectable } from '@angular/core';
import { Candidate } from '../classes/candidate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private candidatesList:Array<Candidate>=[];
  Url = "https://localhost:44329/api/Candidate";

  constructor(private myHttp:HttpClient) { }
  getList():Observable<Array<Candidate>>{
    return this.myHttp.get<Array<Candidate>>(this.Url);

  }
  getById(id:number):Observable<Candidate>{
    return this.myHttp.get<Candidate>(this.Url + "GetById/"+id);
  }
  loadData(){
    this.getList().subscribe(
      (myData)=>
       {
         this.candidatesList = myData;
       },
       myErr=>
       {
         alert(myErr.message);
       }
  )}
  getCandidateList()
  {
    return this.candidatesList;
  }


}
