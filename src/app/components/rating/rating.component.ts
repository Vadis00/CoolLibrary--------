import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent implements OnInit {
  @Input() ratingValue: number = 0;
  alreadyDone: boolean = false;

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

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {

    if (this.localStorageService.contains(this.itemId.toString())) {
      this.ratingValue = Number(this.localStorageService.get(this.itemId.toString()));
      this.alreadyDone = true;
    }

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

    this.alreadyDone = true;
    this.localStorageService.set(this.itemId.toString(), rating.toString());
    this.ratingUpdatew.emit(rating);
  }
}

interface IDictionary {
  [index: string]: boolean;
}
