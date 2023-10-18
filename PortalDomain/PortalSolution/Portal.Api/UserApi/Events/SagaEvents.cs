using Wolverine;

namespace Portal.Api.UserApi.Events;
/*### `company.com.portal.user-issue.annotated`

### `company.com.portal.user-issue.rejected`

### `company.com.portal.user-issue.created`
*/

public record UserIssueAnnotated(string message);
public record UserIssueRejected();

public record IssueCreated();


public record AnnotationAdded(string Note);

public record UserIssueTimeOut(string Id) : TimeoutMessage(TimeSpan.FromMinutes(10));

public record SagaStarted(string Id);