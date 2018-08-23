import {async, TestBed} from "../../../../node_modules/@angular/core/testing";
import {ItemsService} from "../../services/items.service";
import {ItemsListComponent} from "./items-list.component";
import {ItemComponent} from "./item/item.component";
import {of,} from "rxjs";

describe('ItemsListComponent', () => {
  let itemsListComponent: ItemsListComponent;
  // let itemsService: ItemsService;
  let fixture;
  let mockItemService;

  beforeEach(async(() => {
    mockItemService = jasmine.createSpyObj('ItemsService', ['getItems', 'saveEvent']);

    TestBed.configureTestingModule({
      declarations: [ItemsListComponent, ItemComponent],
      providers: [{provide: ItemsService, useValue: mockItemService}]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    mockItemService.saveEvent.and.returnValue(of());
    mockItemService.getItems.and.returnValue(of());

    fixture = TestBed.createComponent(ItemsListComponent);
    itemsListComponent = fixture.componentInstance;
  });

  describe('when initialized', () => {
    it('should create a component', () => {
      expect(itemsListComponent).toBeDefined()
    });
    it('should be subscribed to getItems', () => {
      fixture.detectChanges();
      expect(mockItemService.getItems).toHaveBeenCalledTimes(1)
    });
    it('should subscribe to be notified for save event changes', () => {
      mockItemService.saveEvent.and.returnValue(of(mockItemService.getItems));
      fixture.detectChanges();
      expect(mockItemService.getItems).toHaveBeenCalledTimes(2)
    })
  })

  describe('when get items', () => {
    it('should fetch all notes', () => {
      let items = [{
        id: 1,
        name: 'name',
        price: 10.99,
        image: 'image',
        valid: true
      }]

      mockItemService.getItems.and.returnValue(of(items))

      itemsListComponent.getItems()

      expect(mockItemService.getItems).toHaveBeenCalledTimes(1)
      expect(itemsListComponent.items).toEqual(items)
    })
  })

});


