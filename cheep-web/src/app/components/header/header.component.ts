import {Component, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Output() formVisible = false;
  toggleText = '(+)';

  toggleForm() {
    this.formVisible = !this.formVisible;

    this.toggleText = '(+)';
    if (this.formVisible) {
      this.toggleText = '(−)'
    }
  }
}
