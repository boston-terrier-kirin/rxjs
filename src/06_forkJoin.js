import { forkJoin, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

/**
 * 3つobservableがcompleteして初めて、emitされる。
 */
const name$ = ajax('https://random-data-api.com/api/name/random_name');
const nation$ = ajax('https://random-data-api.com/api/nation/random_nation');
const food$ = ajax('https://random-data-api.com/api/food/random_food');

// その名の通り、3つそろってjoinされる。
forkJoin([name$, nation$, food$]).subscribe((res) => {
  const [name, nation, food] = res;
  console.log(
    `${name.response.first_name} is from ${nation.response.capital} and likes to eat ${food.response.dish}`
  );
});

// /**
//  * 片方がエラーになった場合
//  */
// const a$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.next('A');
//     subscriber.complete();
//   }, 3000);
// });
//
// const b$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.error('B was failed');
//   }, 3000);
// });
//
// forkJoin([a$, b$]).subscribe({
//   next: (value) => {
//     console.log(value);
//   },
//   error: (err) => {
//     // Bがエラーになるので、最終結果はエラー。Aだけで値が返ってくるわけではない。
//     console.log('Error: ' + err);
//   },
//   complete: () => {
//     console.log('Complete');
//   },
// });
