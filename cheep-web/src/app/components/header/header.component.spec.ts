import {TestBed} from "@angular/core/testing";
import {HeaderComponent} from "./header.component";

describe('HeaderComponent', () => {
  it('should create a component', () => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ]
    });

    const fixture = TestBed.createComponent(HeaderComponent);
    const headerComponent = fixture.componentInstance;

    expect(headerComponent).toBeDefined();
  });
});
