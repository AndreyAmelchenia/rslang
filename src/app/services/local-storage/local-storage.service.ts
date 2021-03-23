import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageData } from '../../models/local-storage-data.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage: Storage;

  constructor(@Inject(DOCUMENT) private document: Document) {
      if (this.document.defaultView && this.document.defaultView.localStorage) {
      this.storage = this.document.defaultView.localStorage;
    }
  }

  setItem({ key, data }: LocalStorageData): void {
    if (this.storage) {
      this.storage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data);
    }
  }

  getItem(key: string, parse = false): string | null {
    let result = null;
    if (this.storage) {
      result = this.storage.getItem(key);
      if (result && parse) {
        result = JSON.parse(result);
      }
    }
    return result;
  }

  removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }

  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }
}
