namespace Portal.Api.UserApi.Events;


public record UserIssueCreated(Guid IssueId, Guid SoftwareId, Guid UserId, string Narrative, DateTimeOffset CreatedOn);
