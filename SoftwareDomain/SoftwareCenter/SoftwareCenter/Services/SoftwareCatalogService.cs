using DotNetCore.CAP;

using Microsoft.EntityFrameworkCore;

using SoftwareCenter.Data;
using SoftwareCenter.Models;
using SoftwareCenter.Pages.Catalog;

namespace SoftwareCenter.Services;

public class SoftwareCatalogService
{
    private readonly SoftwareDataContext _context;
    private readonly IPublishSoftwareMessages _publisher;
    private readonly ICapPublisher _capPublisher;

    public SoftwareCatalogService(SoftwareDataContext context, IPublishSoftwareMessages publisher, ICapPublisher capPublisher)
    {
        _context = context;
        _publisher = publisher;
        _capPublisher = capPublisher;
    }

    public IQueryable<SoftwareInventoryItemEntity> GetActiveTitles() => _context.GetActiveTitles();

    public async Task AddTitleAsync(TitleCreateModel request)
    {
        var titleToAdd = SoftwareInventoryItemEntity.From(request);
        _context.Titles.Add(titleToAdd);
        // call the portal and let them know there is new software
        await _context.SaveChangesAsync(); // save it to the local database
        await _publisher.PublishNewTitleAsync(titleToAdd); // publishing it to the broker.
    }

    public async Task RetireTitleAsync(int id)
    {

        // call the portal and let them know there is new software
        var title = await GetActiveTitles().SingleOrDefaultAsync(t => t.Id == id);
        if (title is null)
        {
            throw new ArgumentOutOfRangeException(nameof(RetireTitleAsync), "Title Not In Inventory to Retire");
        }
        else
        {
            title.Retired = true;
            await _context.SaveChangesAsync();


            await _publisher.RetireSoftwareTitleAsync(title);
        }
    }

    public async Task AddAnnotationToTitleAsync(UserEventAnnotation annotation)
    {
        // TODO: Store it locally.
        await _capPublisher.PublishAsync("company.com.software.userissuerannotated", annotation);
    }
}
