import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  elements: string[] = [];
  inputValue: string = '';

  constructor() {}

  addElement() {
    if(!this.inputValue.length) return;
    this.elements.push(this.inputValue);
    this.inputValue = '';
  }

  handleDelete(event: Event, index: number) {
    event.preventDefault();
    this.elements.splice(index, 1);
  }

 }
