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
  
  
  public x:number=0;
  checkCondition(newDate:Date,year:number){
    var cutString:string ="";
    var s:string="";
     s+=newDate.toString();
     cutString+=s.charAt(0)+s.charAt(1)+s.charAt(2)+s.charAt(3)
      this. x = parseInt(cutString)-year
    if(this.x>=3)
    return true;
 return false;
  }
  showCandidateList(){
    if(this.candidates.length==0)
        this.candidates = this.candidateServ.getCandidateList();
    this.showTable=!this.showTable;
  }
  getMatchCandidates(langauge:string,level:string){
    this.candidates = this.candidateServ.getCandidateList();

    if(level==="Senyor"){
  this.senyorList=this.candidates.filter(x=>this.checkCondition(x.LastUpdateDate,x.BeginYear)==true)
  this.matchCandidates=this.senyorList.filter(x=>x.allLanguages.includes(langauge))
    }
  else{
  this.JuniorList=this.candidates.filter(x=>this.checkCondition(x.LastUpdateDate,x.BeginYear)==false)
  this.matchCandidates=this.JuniorList.filter(x=>x.allLanguages.includes(langauge))

  }
if(this.matchCandidates.length==0)
alert("there are not match candidate")
}
}
