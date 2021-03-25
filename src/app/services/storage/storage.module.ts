import { ModuleWithProviders, NgModule } from '@angular/core';

import { LocalStorage } from './interfaces/local-storage.interface';
import { MemoryStorage } from './interfaces/memory-storage.interface';
import { SessionStorage } from './interfaces/session-storage.interface';
import { StorageOptions } from './interfaces/storage-options.interface';
import { BaseLocalStorage } from './storages/base-local.storage';
import { BaseMemoryStorage } from './storages/base-memory.storage';
import { BaseSessionStorage } from './storages/base-session.storage';

@NgModule()
export class StorageModule {
  static forRoot(options: Partial<StorageOptions> = {}): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        {
          provide: LocalStorage,
          useClass: options.localStorage || BaseLocalStorage,
        },
        {
          provide: MemoryStorage,
          useClass: options.memoryStorage || BaseMemoryStorage,
        },
        {
          provide: SessionStorage,
          useClass: options.sessionStorage || BaseSessionStorage,
        },
      ],
    };
  }
}
