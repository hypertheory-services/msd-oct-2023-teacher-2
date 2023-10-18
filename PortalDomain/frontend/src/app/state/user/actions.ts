import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserIssue, UserIssueCreate, UserState } from ".";


export const UserEvents = createActionGroup({
    source: 'User Events',
    events: {
        'Entered': emptyProps(),
        'Issue Added': props<{payload: UserIssueCreate}>()

    }
});

export const UserDocuments = createActionGroup({
    source: 'User Documents',
    events: {
        'User': props<{payload: UserState}>(),
        'Issue': props<{payload: UserIssue}>(),
    }
});