# Our UserCreated Saga

```mermaid
stateDiagram-v2
    [*] --> UserIssueCreated
    UserIssueCreated --> Annotated
    UserIssueCreated --> IssueCreated
    UserIssueCreated --> IssueRejected
    Annotated --> UserIssueCreated
    IssueCreated --> Done
    IssueRejected --> Done
    Done --> [*]
```