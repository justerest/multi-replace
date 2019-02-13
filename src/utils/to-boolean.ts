import { from, ObservableInput, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

export function toBoolean(observableInput: ObservableInput<any>) {
	return from(observableInput).pipe(mapTo(true), catchError(() => of(false)));
}
