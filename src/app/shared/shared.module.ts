import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        DropdownDirective,
        SpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        CommonModule,
        DropdownDirective,
        SpinnerComponent
    ]
})
export class SharedModule {

}