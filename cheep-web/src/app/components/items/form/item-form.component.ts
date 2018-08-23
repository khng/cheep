import {Component, OnInit} from "@angular/core";
import {ItemsService} from "../../../services/items.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "item-form",
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent implements OnInit {
  itemFormGroup: FormGroup;

  itemNameFormControl: FormControl;
  itemPriceFormControl: FormControl;
  itemImageUrlFormControl: FormControl;

  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.itemNameFormControl = new FormControl('', Validators.required);
    this.itemPriceFormControl = new FormControl('', Validators.required);
    this.itemImageUrlFormControl = new FormControl('', Validators.required);

    this.itemFormGroup = new FormGroup({
      itemName: this.itemNameFormControl,
      itemPrice: this.itemPriceFormControl,
      itemImage: this.itemImageUrlFormControl
    })
  }

  onSubmit(formValue) {
    this.itemService.saveItem(formValue.itemName, formValue.itemPrice, formValue.itemImage).subscribe(() => {
      this.itemService.notifyGetEvent()
      this.itemFormGroup.reset('')
    })
  }

  validateName() {
    return this.itemNameFormControl.invalid && this.itemNameFormControl.dirty
  }
  validatePrice() {
    return this.itemPriceFormControl.invalid && this.itemPriceFormControl.dirty
  }
  validateImage() {
    return this.itemImageUrlFormControl.invalid && this.itemImageUrlFormControl.dirty
  }
}
