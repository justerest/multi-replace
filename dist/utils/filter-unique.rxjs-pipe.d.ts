import { MonoTypeOperatorFunction } from 'rxjs';
/**
 * RxJs pipable operator.
 */
export declare function filterUnique<T>(fn?: (arg: T) => any): MonoTypeOperatorFunction<T>;
