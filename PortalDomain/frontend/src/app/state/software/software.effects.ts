import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Actions,
  ROOT_EFFECTS_INIT,
  createEffect,
  ofType,
} from "@ngrx/effects";
import { from, map, switchMap } from "rxjs";
import { SoftwareEntity } from ".";
import { SoftwareCatalogDocuments } from "./actions";
import * as signalR from "@microsoft/signalr";
import { Store } from "@ngrx/store";

@Injectable()
export class SoftwareEffects {
  private readonly connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:1337/software/hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  startSignal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => from(this.connection.start()))
      ),

    { dispatch: false }
  );

  loadSoftware$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() =>
        this.http
          .get< SoftwareEntity[] >("http://localhost:1337/software")
          .pipe(
           
            map((payload) => SoftwareCatalogDocuments.catalog({ payload }))
          )
      )
    )
  );
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {
    this.connection.on(
      "software-added",
      (software: SoftwareEntity ) => {
        this.store.dispatch(
          SoftwareCatalogDocuments.software({ payload: software })
        );
      }
    );
    this.connection.on('software-retired', (software: SoftwareEntity) => {
      this.store.dispatch(SoftwareCatalogDocuments.software({ payload: software }));
    });
  }
}
