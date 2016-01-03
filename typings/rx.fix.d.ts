declare module Rx {
	export interface ObservableStatic {
		combineLatest<T, T2, TResult>(first: Observable<T>, second: Observable<T2>): Observable<TResult>;
	}
}