import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  @Input() character: any;

  constructor() { }

  ngOnInit() {
  }

}
