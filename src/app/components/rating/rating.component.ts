import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent implements OnInit {
  @Input() ratingValue: number = 0;
  @Input() itemId: number = 0;
  @Output() ratingUpdatew = new EventEmitter<any>();
  ratingAclual: string;

  ratingEmoji = {
    '0': false,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  } as IDictionary;

  ratingChecked = {
    '0': false,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  } as IDictionary;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.ratingValue);
    this.ratingAclual = Math.trunc(this.ratingValue).toString();
    this.ratingEmoji[this.ratingAclual] = true;

    for (let i = 0; i <= this.ratingValue; i++) {
      this.ratingChecked[i.toString()] = true;
    }
  }

  click(rating: number) {
    this.ratingEmoji[this.ratingAclual] = false;
    this.ratingEmoji[rating] = true;
    this.ratingAclual = rating.toString();

    for (let i = 0; i < 5; i++) {
      if (rating > i) {
        this.ratingChecked[i.toString()] = true;
      } else {
        this.ratingChecked[i.toString()] = false;
      }

    }

    this.ratingUpdatew.emit(rating);
  }
}

interface IDictionary {
  [index: string]: boolean;
}
