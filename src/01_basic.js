import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  const id = setInterval(() => {
    subscriber.next('Hello world');
  }, 1000);

  return () => {
    console.log('cleanup');
    clearInterval(id);
  };
});

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

setTimeout(() => {
  console.log('unsubscribe');
  subscribe.unsubscribe();
}, 5000);
