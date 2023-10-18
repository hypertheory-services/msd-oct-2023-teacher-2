using Marten;
using Portal.Api.UserApi.Events;
using Wolverine;

namespace Portal.Api.UserApi.Handlers;
//public record UserIssueTimeOut(string Id): TimeoutMessage(TimeSpan.FromMinutes(10));
public class UserIssueSaga : Saga
{

    public Guid Id { get; set; } // This is the id of the user issue we are talking about.

    // What starts it
    public static (SagaStarted, UserIssueTimeOut) Start(UserIssueCreated command)
    {
        var started = new SagaStarted("the-id");
        var timeOut = new UserIssueTimeOut("the-id");
        return (started, timeOut);
    }

    // what can happen while it is active.
    public static AnnotationAdded Handle(UserIssueAnnotated command, IDocumentSession session)
    {
        // load that issue, add an annotation to entity
        return new AnnotationAdded(command.message);
    }

    // What ends it 

    public void Handle(UserIssueTimeOut command)
    {
        // do your thang, 
        MarkCompleted();
    }
    public void Handle(UserIssueRejected command)
    {
        // update the state - read model, dispatch an event so the user will know.
        MarkCompleted();
    }

    public void Handle(IssueCreated command)
    {
        MarkCompleted();
    }
}
