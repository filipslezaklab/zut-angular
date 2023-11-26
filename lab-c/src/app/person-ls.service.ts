import { Injectable } from '@angular/core';
import { Person } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class PersonLsService {
  readonly KEY = 'stored-people-data';

  constructor() { }

  // get from localstore, in case of bad value return empty array
  private getFromStore(): Person[] {
    const storageVal = localStorage.getItem(this.KEY);

    if(!storageVal) return [];

    const parsed = JSON.parse(storageVal);

    if(!parsed || !Array.isArray(parsed)) return [];

    return parsed as Person[];
  }

  // save persons in designated key in localStorage
  private save(data: Person[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

  public getAll(): Person[] {
    return this.getFromStore();
  }

  public getPerson(index: number): Person | undefined {
    const stored = this.getFromStore();
    if(index < 0) return undefined;
    return stored[index];
  }

  public addPerson(data: Person): void {
    const stored = this.getFromStore();
    stored.push(data);
    this.save(stored);
  }

  public deletePerson(index: number): void {
    const stored = this.getFromStore();
    stored.splice(index, 1);
    this.save(stored);
  }
}
