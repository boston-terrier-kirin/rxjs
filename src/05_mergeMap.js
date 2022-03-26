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
  mergeMap(() => {
    // mergeMap：両方
    // Slow3Gモードで2回ボタンをクリックすると、1回目も2回目も実行される。
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
