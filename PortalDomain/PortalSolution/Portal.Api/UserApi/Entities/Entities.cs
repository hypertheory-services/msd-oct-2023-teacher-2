namespace Portal.Api.UserApi.Entities;

public record UserEntity(Guid Id, DateTimeOffset CreatedOn, string Identifier, IReadOnlyList<UserIssueEntity> PendingIssues);



public record UserIssueEntity();