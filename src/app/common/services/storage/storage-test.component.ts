import { Component, Optional } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/storage/local.service';
import { SessionService } from 'src/app/common/services/storage/session.service';

@Component({
  selector: 'app-storage-test',
  template: '',
})
export class StorageTestComponent {
  constructor(
    @Optional() private localStorage: LocalStorageService,
    @Optional() private sessionStorage: SessionService,
  ) {
    this.testSetGetLocalStorageTestFunction();
  }

  testSetGetLocalStorageTestFunction(): void {
    const token = 'asjkldkljasdw89350sjldfq234jo12i4';
    this.localStorage.setItem('user', JSON.stringify({ id: 99, email: 'test@tut.by', token }));
    this.sessionStorage.setItem('test-session', `some session string + token: ${token}`);
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('this local storage work!', this.localStorage.getItem('user'));
      // eslint-disable-next-line no-console
      console.log('this session storage work!', this.sessionStorage.getItem('test-session'));
    }, 1000);
  }
}
