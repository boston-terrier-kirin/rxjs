import { combineLatest, Observable, startWith } from 'rxjs';
import { ajax } from 'rxjs/ajax';

/**
 * 3つobservableがcompleteして初めて、emitされる。
 */
const name$ = ajax('https://random-data-api.com/api/name/random_name');
const nation$ = ajax('https://random-data-api.com/api/nation/random_nation');
const food$ = ajax('https://random-data-api.com/api/food/random_food');

const shortRunning$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('shortRunning');
    subscriber.complete();
  }, 3000);
}).pipe(
  // combineLatestは全部のobservableの初回emitを待ってしまうので、初期値を返す。
  startWith('processing')
);

const longRunning$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('longRunning');
    subscriber.complete();
  }, 10000);
}).pipe(
  // combineLatestは全部のobservableの初回emitを待ってしまうので、初期値を返す。
  startWith('processing')
);

const timeout$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('timeout');
  }, 6000);
}).pipe(
  // combineLatestは全部のobservableの初回emitを待ってしまうので、初期値を返す。
  startWith('processing')
);

combineLatest([
  name$,
  nation$,
  food$,
  shortRunning$,
  longRunning$,
  timeout$,
]).subscribe({
  next: (res) => {
    const [name, nation, food, shortRunning, longRunning, timeout] = res;
    console.log(name);
    console.log(nation);
    console.log(food);
    console.log(shortRunning);
    console.log(longRunning);
    console.log(timeout);
    console.log('-----');
  },
  error: (err) => {
    // エラーが発生すると、processing含め止まる。
    // エラーになるまでの値は返ってくるので、一部のみ画面にデータが表示されてしまう。
    console.log('💥', err);
  },
});
