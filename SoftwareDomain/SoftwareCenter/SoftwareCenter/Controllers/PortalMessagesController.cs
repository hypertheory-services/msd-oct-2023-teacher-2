using DotNetCore.CAP;
using Microsoft.AspNetCore.Mvc;
using SoftwareCenter.Data;

namespace SoftwareCenter.Controllers;

public class PortalMessagesController : ControllerBase
{
    private readonly ILogger<PortalMessagesController> _logger;
    private readonly SoftwareDataContext _context;
    private readonly ICapPublisher _publisher;

    public PortalMessagesController(ILogger<PortalMessagesController> logger, SoftwareDataContext context, ICapPublisher publisher)
    {
        _logger = logger;
        _context = context;
        _publisher = publisher;
    }

    [CapSubscribe("company.com.portal.userissuecreated")]
    public async Task<ActionResult> AddUserIssue([FromBody] UserIssueModel request)
    {

        _logger.LogInformation("Got a message! {0}", request);
        var newIssue = new UserIssueEntity
        {
            IssueId = request.IssueId,
            Description = request.Description,
            SoftwareId = int.Parse(request.SoftwareId),
            User = request.User,
        };
        _context.UserIssues.Add(newIssue);
        await _context.SaveChangesAsync();
        await _publisher.PublishAsync(
            "company.com.software.userissuereceived",
            new UserIssueLogged(newIssue.IssueId, DateTimeOffset.Now));


        return Ok();
    }
}




public record UserIssueLogged(string IssueId, DateTimeOffset When);


public class UserIssueModel
{
    public string IssueId { get; set; }
    public string User { get; set; }
    public string SoftwareId { get; set; }
    public string Description { get; set; }
}
