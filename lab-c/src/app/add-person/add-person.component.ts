import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/types';
import { PersonLsService } from '../person-ls.service';

type FormFields = {
  age: string;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    postCode: string;
    street: string;
  }
}

const defaultValues: FormFields = {
    age: '',
    firstName: '',
    lastName: '',
    address: {
      city: '',
      postCode: '',
      street: '',
    }
  };


@Component({
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
})
export class AddPersonComponent {
  formFields: FormFields = defaultValues;

  constructor(private personLs: PersonLsService, private router: Router){
  }

  save(event: SubmitEvent) {
    event.preventDefault();
    const person: Person = {
      ...this.formFields,
      age: Number.parseInt(this.formFields.age),
    };
    this.personLs.addPerson(person);
    this.router.navigate(['list'], {replaceUrl: true});
    return false;
  }
}
