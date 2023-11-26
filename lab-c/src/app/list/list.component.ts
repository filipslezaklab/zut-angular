import { Component, OnInit } from '@angular/core';
import { Person } from 'src/types';
import { PersonLsService } from '../person-ls.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  people: Person[] = [];

  constructor(private personLs: PersonLsService) {}
  ngOnInit(): void {
    this.people = this.personLs.getAll();
  }

  remove(index: number): void {
    if (confirm('Are you sure?')) {
      this.personLs.deletePerson(index);
      this.people = this.personLs.getAll();
    }
  }
}
