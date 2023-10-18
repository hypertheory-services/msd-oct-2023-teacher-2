import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { SoftwareCatalogDocuments } from "./actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface SoftwareEntity {
    id: string;
    title: string;
    retired: boolean;
}

export interface SoftwareState extends EntityState<SoftwareEntity> {};


const adapter = createEntityAdapter<SoftwareEntity>();

const initialState: SoftwareState = adapter.getInitialState();

export const softwareFeature = createFeature({
    name: 'sofware',
    reducer: createReducer(initialState,
        on(SoftwareCatalogDocuments.catalog, (s,a) => adapter.setAll(a.payload, s)),
        on(SoftwareCatalogDocuments.software, (s,a) => adapter.upsertOne(a.payload, s)),
    ),
    extraSelectors: ({selectSofwareState}) => ({
        selectActiveSoftware: createSelector(selectSofwareState, s => adapter.getSelectors().selectAll(s).filter(sw => sw.retired === false)),
        selectAllSoftware: createSelector(selectSofwareState, s => adapter.getSelectors().selectAll(s)),
    })
})