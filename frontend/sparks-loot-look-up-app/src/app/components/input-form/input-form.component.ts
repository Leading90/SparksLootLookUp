import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  selectedItem = new FormControl();
  items = this.requestService.getOptions();

  ngOnInit(): void {
  }

}
