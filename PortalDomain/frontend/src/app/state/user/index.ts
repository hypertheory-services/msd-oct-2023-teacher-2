import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { UserDocuments } from "./actions";
import { softwareFeature } from "../software";

export interface UserState {
  identifier: string;
  pendingIssues: UserIssue[];
  createdOn: string;
  id: string;
}
const initialState: UserState = {
  id: "",

  createdOn: "",
  identifier: "",
  pendingIssues: [],
};

export const userFeature = createFeature({
  name: "user",
  reducer: createReducer(
    initialState,
    on(UserDocuments.user, (s, a) => a.payload),
    on(UserDocuments.issue, (s, a) => ({
      ...s,
      pendingIssues: [...s.pendingIssues, a.payload],
    }))
  ),
});

export const selectUserIssues = createSelector(
  userFeature.selectPendingIssues,
  softwareFeature.selectAllSoftware,
  (issues, catalog) => {
    return issues.map((issue) => {
      const software = catalog.find((s) => s.id === issue.softwareId);
      return {
        issueId: issue.issueId,
        software: software?.title ?? "Unknown",
        description: issue.description,
        created: issue.created,
        status: "Pending Product Owner Review",
      } as UserIssueModel;
    });
  }
);

export type UserIssueCreate = {
  softwareId: string;
  narrative: string;
};

export type UserIssue = {
  issueId: string;
  softwareId: string;
  description: string;
  created: string;
};

export type UserIssueModel = {
  issueId: string;
  software: string;
  description: string;
  created: string;
  status: "Pending Product Owner Review";
};
