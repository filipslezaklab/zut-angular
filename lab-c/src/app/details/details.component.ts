import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Person } from 'src/types';
import { PersonLsService } from '../person-ls.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  paramId!: number;
  person?: Person;

  constructor(private route: ActivatedRoute, private router: Router, private personLs: PersonLsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((val: ParamMap) => {
      const param = val.get('id');
      if(!param) {
        this.router.navigate(['list'], {
          replaceUrl: true
        });
        return;
      }
      this.paramId = Number.parseInt(param);
      this.person = this.personLs.getPerson(this.paramId);
      if(!this.person) {
        this.router.navigate(['list'], {
          replaceUrl: true
        });
      }
    })
  }
}
