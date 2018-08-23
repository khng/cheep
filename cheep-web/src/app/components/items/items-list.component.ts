import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {IItem} from "../../models/item.model";

@Component({
  selector: 'item-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
  items: IItem[];

  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.getItems()
    this.itemService.saveEvent().subscribe(() => {
      this.getItems()
    })
  }

  getItems() {
    this.itemService.getItems().subscribe((items: IItem[]) => {
      this.items = items
    });
  }
}
