import {Component, Input} from '@angular/core';
import {IItem} from "../../../models/item.model";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  @Input() item: IItem;
}
