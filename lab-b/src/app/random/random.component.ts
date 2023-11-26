import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RandomService } from '../random.service';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomComponent implements OnInit {
  @Input('max') max!: number;
  generated?: number;

  constructor(private randomService: RandomService) {}

  ngOnInit(): void {
    this.generated = this.randomService.randomNumber(this.max);
  }

  randomize(event: Event) {
    event.preventDefault();
    this.generated = this.randomService.randomNumber(this.max);
  }

 }
