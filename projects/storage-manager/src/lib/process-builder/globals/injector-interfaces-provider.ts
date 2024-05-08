import { HttpHeaders } from "@angular/common/http";
import { merge, throwError } from "rxjs";
import { catchError, debounceTime, delay, map, mergeMap, switchMap, tap } from "rxjs/operators";

export class InjectorInterfacesProvider {

    static httpClient() {
        return {
            'get()': { type: 'function', apply: 'get(/*url*/).toPromise()', info: 'asynchronously' },
            'post()': { type: 'function', apply: 'post(/*url*/, /*data*/).toPromise()', info: 'asynchronously' },
            'put()': { type: 'function', apply: 'put(/*url*/, /*data*/).toPromise()', info: 'asynchronously' },
            'delete()': { type: 'function', apply: 'delete(/*url*/).toPromise()', info: 'asynchronously' }
        }
    }

    static httpExtensions() {
        return {
            'HttpHeaders': { type: 'function', apply: "HttpHeaders().set('authorization': /*your auth header*/)", info: 'asynchronously' },
        }
    }

    static rxjs() {
        return {
            'catchError': { type: 'catchError', apply: 'catchError((error) => { return injector.rxjs.throwError(error); })' },
            'debounceTime': { type: 'function' },
            'delay': { type: 'function' },
            'map': { type: 'function' },
            'merge': { type: 'function' },
            'mergeMap': { type: 'function' },
            'switchMap': { type: 'function' },
            'tap': { type: 'function' },
            'throwError': { type: 'function' }
        }
    }

}

export class InjectorProvider {

    static rxjs() {
        return {
            'catchError': catchError,
            'debounceTime': debounceTime,
            'delay': delay,
            'map': map,
            'merge': merge,
            'mergeMap': mergeMap,
            'switchMap': switchMap,
            'tap': tap,
            'throwError': throwError
        };
    }

    static httpExtensions() {
        return {
            'HttpHeaders': HttpHeaders
        };
    }

}
