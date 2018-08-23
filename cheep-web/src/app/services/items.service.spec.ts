import {ItemsService} from "./items.service";
import {IItem} from "../models/item.model";
import {of} from "rxjs";

describe('ItemService', () => {
  let itemService: ItemsService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post']);
    itemService = new ItemsService(mockHttp)
  });

  describe('getItems', () => {
    it('should return a list of items from server', () => {
      let items: IItem[] = [{
        id: 1,
        name: 'name',
        price: 10.00,
        image: 'image',
        valid: true
      }];

      mockHttp.get.and.returnValue(of(items));

      itemService.getItems().subscribe(response => {
        expect(response).toEqual(items)
      });

      expect(mockHttp.get).toHaveBeenCalledTimes(1)
    })
  });

  describe('saveItem', () => {
    it('should save item to server', () => {
      let item: IItem = {
        id: 1,
        name: 'name',
        price: 10.00,
        image: 'image',
        valid: true
      };

      mockHttp.post.and.returnValue(of(item));

      itemService.saveItem(item.name, item.price, item.image).subscribe(response => {
        expect(response).toEqual(item)
      });

      expect(mockHttp.post).toHaveBeenCalledTimes(1)
    })
  });

  describe('notifyGetEvent', () => {
    it('should emit saveEvent', () => {
      let spyCalled = false;

      itemService.saveEvent().subscribe(() => {
        spyCalled = true
      });

      itemService.notifyGetEvent();

      expect(spyCalled).toBeTruthy()
    })
  })
});
