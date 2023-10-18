import { createActionGroup, props } from "@ngrx/store";
import { SoftwareEntity } from ".";


export const SoftwareCatalogDocuments = createActionGroup({
    source: 'Software Catalog Documents',
    events: {
        'Catalog': props<{payload: SoftwareEntity[]}>(),
        'Software': props<{payload: SoftwareEntity}>()
    }
})