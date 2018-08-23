import {ItemComponent} from "./item.component";
import {async, TestBed} from "@angular/core/testing";

describe('ItemComponent', () => {
  it('should create a component', () => {
    TestBed.configureTestingModule({
      declarations: [
        ItemComponent
      ]
    });

    const fixture = TestBed.createComponent(ItemComponent);
    const itemComponent = fixture.componentInstance;

    expect(itemComponent).toBeDefined();
  });
});
