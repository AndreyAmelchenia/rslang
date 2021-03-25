import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Word } from 'src/app/models/word.model';
import { WORDS } from '../data/words';

export class WordsDataSource extends DataSource<Word> {
  data: Word[] = WORDS;

  paginator: MatPaginator;

  connect(): Observable<Word[]> {
    console.log('connect');

    const dataMutations = [observableOf(this.data), this.paginator.page];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData([...this.data]);
      }),
    );
  }

  disconnect() {
    console.log('disconnect');
  }

  private getPagedData(data: Word[]) {
    console.log('getPagedData');
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
