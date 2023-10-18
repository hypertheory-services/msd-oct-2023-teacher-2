import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserDocuments, UserEvents } from "./actions";
import { map, mergeMap, switchMap } from "rxjs";
import { UserIssue, UserState } from ".";

@Injectable()
export class UserEffects {


    submitIssue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserEvents.issueAdded),
            mergeMap(({payload}) => this.http.post<UserIssue>('http://localhost:1337/user/issues', payload)
                .pipe(
                    map(payload => UserDocuments.issue({payload}))
                )
        )
        ), {dispatch: true}
    );
    loadUserState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserEvents.entered),
            switchMap(() => this.http.get<UserState>('http://localhost:1337/user')
                .pipe(
                    map(payload => UserDocuments.user({payload}))
                )
        )
        ), {dispatch: true}
    );

    constructor(private readonly actions$: Actions, private readonly http:HttpClient) {}
}