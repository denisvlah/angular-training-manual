// src/app/shared/material.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
// Add other Material imports as needed

export const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbar,
  // Add other Material modules here
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }