import {
  concatMap,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  switchMap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const button = document.getElementById('btn');
const observable = fromEvent(button, 'click').pipe(
  exhaustMap(() => {
    // exhaustMap：先勝ち
    // Slow3Gモードで2回ボタンをクリックすると、2回目は無視して、1回目が実行される。
    return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1');
  })
);

const subscribe = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
  error: (err) => {
    console.log(err);
  },
  complete: () => {
    console.log('complete');
  },
});
