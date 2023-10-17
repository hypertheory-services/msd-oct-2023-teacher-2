using Portal.Api.UserApi.Commands;
using Portal.Api.UserApi.Entities;
using Wolverine;

namespace Portal.Api.UserApi;

public static class Api
{
    public static RouteGroupBuilder MapUserApi(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/user");
        group.RequireCors("cors");
        group.RequireAuthorization();

        group.MapGet("/", async (IMessageBus bus) =>
        {
            var response = await bus.InvokeAsync<UserEntity>(new GetUser());
            return TypedResults.Ok(response);
        });


        return group;
    }
}
