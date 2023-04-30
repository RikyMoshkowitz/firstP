import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  public candidates:Array<Candidate>=[]
  public senyorList:Array<Candidate>=[];
  public matchCandidates:Array<Candidate>=[];
  public JuniorList:Array<Candidate>=[];

  showTable:boolean=false;
  constructor(private candidateServ:CandidateService){}
  ngOnInit(): void {
     this.candidateServ.getList().subscribe(
     (myData)=>
      {
        this.candidates= myData;
      },
      myErr=>
      {
        alert(myErr.message);
      }
    )

      this.candidateServ.loadData();
          

  }
  showCandidateList(){
    this.candidates = this.candidateServ.getCandidateList();
    alert (this.candidates.length);
    this.showTable=!this.showTable;
  }
  getMatchCandidates(langauge:string,level:string){
    this.candidates = this.candidateServ.getCandidateList();

    if(level==="senyor"){
  this.senyorList=this.candidates.filter(x=>x.LastUpdateDate.getUTCFullYear()-x.yearBegin>3)
  this.matchCandidates=this.senyorList.filter(x=>x.allLanguage.includes(langauge))
    }
  else{
  this.JuniorList=this.candidates.filter(x=>x.LastUpdateDate.getFullYear()-x.yearBegin<3)
  this.matchCandidates=this.JuniorList.filter(x=>x.allLanguage.includes(langauge))

  }}
}
