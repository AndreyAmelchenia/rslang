import { NgModule } from '@angular/core';
// delete this test component
import { StorageTestComponent } from '../common/services/storage/storage-test.component';
import { AngularMaterialModule } from './material/material.module';

@NgModule({
  declarations: [StorageTestComponent],
  exports: [AngularMaterialModule, StorageTestComponent],
})
export class SharedModule {}
