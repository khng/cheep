import {ItemFormComponent} from "./item-form.component";
import {async, TestBed} from "@angular/core/testing";
import {ItemsService} from "../../../services/items.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('ItemFormComponent', () => {
  let itemFormComponent: ItemFormComponent;
  let mockItemService;
  let fixture;

  beforeEach(async(() => {
    mockItemService = jasmine.createSpyObj('ItemsService', ['saveItem', 'notifyGetEvent']);

    TestBed.configureTestingModule({
      declarations: [ItemFormComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [{provide: ItemsService, useValue: mockItemService}]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    itemFormComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when initialized', () => {
    it('should create a component ', () => {
      expect(itemFormComponent).toBeDefined();
    });

    it('should create FormGroup', () => {
      expect(itemFormComponent.itemFormGroup instanceof FormGroup).toBe(true)
    });

    it('should create FormControls for each field', () => {
      expect(Object.keys(itemFormComponent.itemFormGroup.controls)).toEqual(['itemName', 'itemPrice', 'itemImage'])
    })
  });

  describe('when data is submitted', () => {
    it('should save data from form when fields are filled in, notifyGetEvent, and reset form', () => {
      let formValues = {
        itemName: 'name',
        itemPrice: 10,
        itemImage: 'image'
      };

      let resetState = {
        itemName: null,
        itemPrice: null,
        itemImage: null
      };

      mockItemService.saveItem.and.returnValue(of(mockItemService.notifyGetEvent));

      itemFormComponent.onSubmit(formValues);

      expect(mockItemService.saveItem).toHaveBeenCalledTimes(1);
      expect(mockItemService.notifyGetEvent).toHaveBeenCalledTimes(1);
      expect(itemFormComponent.itemFormGroup.value).toEqual(resetState)
    });
  })

});
