import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { UserEvents } from "../state/user/actions";
import { UserIssue, UserIssueCreate, selectUserIssues, userFeature } from "../state/user";
import { softwareFeature } from "../state/software";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Your User Stuff Here</h2>
      <div>
        <p>Name: {{ user().identifier }}</p>
        <p>Member since: {{ user().createdOn | date }}</p>
      </div>
    </div>
    <section class="container row align-items-start">
      <div class="col">
        <div>
          <h3>Suggest an Issue</h3>
          <p>
            Please look at open issues before submitting an issue for a piece of
            software.
          </p>
        </div>
        <form [formGroup]="softwareForm" (ngSubmit)="sendIssue()">
          <div class="form-group">
            <label for="softwareId">Title</label>
            <select formControlName="softwareId" class="form-control">
              <option [value]="s.id" *ngFor="let s of software()">
                {{ s.title }}
              </option>
            </select>
            <div
              class="alert alert-danger"
              *ngIf="softwareId.errors && (softwareId.touched || softwareId.dirty)"
            >
              <p>Please Select a Title</p>
            </div>
          </div>
          <div class="form-group">
            <label for="narrative">Describe Your Issue</label>
            <textarea
              formControlName="narrative"
              class="form-control"
              rows="7"
            ></textarea>
            <div
              class="alert alert-danger"
              *ngIf="narrative.errors && (narrative.touched || narrative.dirty)"
            >
              <p *ngIf="narrative.hasError('required')">
                Please Provide a Narrative
              </p>
              <p *ngIf="narrative.hasError('minlength')">
                Please Provide a Narrative of at least 5 characters
              </p>
              <p *ngIf="narrative.hasError('maxlength')">
                Please Provide a Narrative of at less than 255 characters
              </p>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit Your Request For An Issue
          </button>
        </form>
      </div>
      <div class="col">
        <div><h3>Your Pending Issues</h3></div>
       
        <div class="alert alert-info" *ngIf="issues().length === 0">
          <p>You Don't Have Any Pending Issues</p>
        </div>
        <ul class="list-unstyled">
          <li class="card" *ngFor="let issue of issues()">
            <div class="card-header">
              <h4>{{ issue.software }}</h4>
            </div>
            <div class="card-body">
              <p><b>Your Issue:</b></p>
              <p>{{ issue.description }}</p>
              <p><b>Submitted:</b> {{ issue.created | date }}</p>
              <p><b>Status:</b> {{ issue.status }}</p>
            </div>
          </li>

        </ul>
      </div>
    </section>
  `,
  styles: [],
})
export class UserComponent {
  store = inject(Store);
  user = this.store.selectSignal(userFeature.selectUserState);
  software = this.store.selectSignal(softwareFeature.selectActiveSoftware);
  issues = this.store.selectSignal(selectUserIssues);

  softwareForm = new FormGroup({
    softwareId: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    narrative: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ],
    }),
  });

  softwareId = this.softwareForm.controls.softwareId;
  narrative = this.softwareForm.controls.narrative;
  ngOnInit() {
    this.store.dispatch(UserEvents.entered());
  }

  sendIssue() {
    if (this.softwareForm.valid) {
      var issue = this.softwareForm.value as UserIssueCreate;
      this.store.dispatch(UserEvents.issueAdded({ payload: issue }));
      this.softwareForm.reset();
    }
  }
}
