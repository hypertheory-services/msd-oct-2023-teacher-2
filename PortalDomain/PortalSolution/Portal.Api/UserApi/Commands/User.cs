namespace Portal.Api.UserApi.Commands;



public record CreateUserIssue(Guid UserId, Guid SoftwareId, string Narrative);

public record GetUser();