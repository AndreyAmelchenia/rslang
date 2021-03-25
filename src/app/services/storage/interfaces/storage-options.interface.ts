import { Type } from '@angular/core';

import { LocalStorage } from './local-storage.interface';
import { MemoryStorage } from './memory-storage.interface';
import { SessionStorage } from './session-storage.interface';

/**
 * Storage options
 */
export interface StorageOptions {
  /**
   * Local storage
   */
  localStorage: Type<LocalStorage>;

  /**
   * Local storage
   */
  memoryStorage: Type<MemoryStorage>;

  /**
   * Session storage
   */
  sessionStorage: Type<SessionStorage>;
}
