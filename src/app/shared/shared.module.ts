import { NgModule } from '@angular/core';
import { LocalStorageService } from '../services/storage/local.service';
import { MemoryService } from '../services/storage/memory.service';
import { SessionService } from '../services/storage/session.service';
// delete this test component
import { StorageTestComponent } from '../services/storage/storage-test.component';
import { AngularMaterialModule } from './material/material.module';
import { AppRoutingModule } from './router/app-routing.module';

@NgModule({
  declarations: [StorageTestComponent],
  exports: [AngularMaterialModule, AppRoutingModule, StorageTestComponent],
  providers: [LocalStorageService, SessionService, MemoryService],
})
export class SharedModule {}
