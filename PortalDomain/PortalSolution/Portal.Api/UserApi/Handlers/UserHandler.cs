﻿using Marten;
using Portal.Api.UserApi.Commands;
using Portal.Api.UserApi.Entities;
using Portal.Api.UserApi.Events;
using System.Security.Claims;
using Wolverine;

namespace Portal.Api.UserApi.Handlers;


// Handlers are classes that handle commands or events.
public class UserHandler
{
    private readonly IDocumentSession _session;
    private readonly IHttpContextAccessor _contextAccessor;

    public UserHandler(IDocumentSession session, IHttpContextAccessor contextAccessor)
    {
        _session = session;
        _contextAccessor = contextAccessor;
    }



    public async Task<UserEntity> HandleAsync(GetUser _, IMessageBus bus)
    {
        var claim = _contextAccessor.HttpContext?.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
        {
            throw new ArgumentNullException("Somehow a bad user got here");
        }

        var sub = claim.Value;
        var user = await _session.Query<UserEntity>().Where(u => u.Identifier == sub).SingleOrDefaultAsync();
        if (user is null)
        {
            // New User

            var newUser = new UserEntity(Guid.NewGuid(), DateTimeOffset.Now, sub, new List<UserIssueEntity>());
            _session.Store(newUser);
            await _session.SaveChangesAsync();
            await bus.PublishAsync(new UserLoggedIn(newUser.Id, DateTimeOffset.Now));
            return newUser;
        }
        else
        {
            // Returning User
            await bus.PublishAsync(new UserLoggedIn(user.Id, DateTimeOffset.Now));
            return user;
        }

    }

    public async Task<UserIssueEntity> HandleAsync(CreateUserIssue command)
    {
        var claim = _contextAccessor.HttpContext?.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
        {
            throw new ArgumentNullException("Somehow a bad user got here");
        }

        var sub = claim.Value;
        var user = await _session.Query<UserEntity>().Where(u => u.Identifier == sub).SingleOrDefaultAsync();
        if (user is not null)
        {
            var issue = new UserIssueEntity(Guid.NewGuid(), command.SoftwareId, command.Narrative, DateTimeOffset.Now);

            user.PendingIssues.Add(issue);

            _session.Store(user);
            await _session.SaveChangesAsync();
            return issue;

        }
        else
        {

            throw new ArgumentException("No User to add an issue to.");
        }


    }
}
