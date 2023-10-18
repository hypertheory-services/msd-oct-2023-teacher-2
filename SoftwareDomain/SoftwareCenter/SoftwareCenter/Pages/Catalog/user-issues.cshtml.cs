using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

using SoftwareCenter.Data;
using SoftwareCenter.Services;

namespace SoftwareCenter.Pages.Catalog;

public class user_issuesModel : PageModel
{
    [BindProperty]
    public SoftwareInventoryItemEntity Title { get; set; } = new();

    [BindProperty(SupportsGet = true)]
    public int Id { get; set; }

    [BindProperty]
    public UserEventAnnotation? Annotation { get; set; } = new();

    private readonly SoftwareCatalogService _service;

    public user_issuesModel(SoftwareCatalogService service)
    {
        _service = service;
    }

    public async Task OnGetAsync()
    {
        Title = await _service.GetActiveTitles().Include(t => t.Issues)
            .Where(t => t.Id == Id)
            .SingleOrDefaultAsync();
    }

    public async Task<IActionResult> OnPostAnnotate()
    {
        Annotation.Id = Id;
        await _service.AddAnnotationToTitleAsync(Annotation);
        return RedirectToPage("/catalog/user-issues/" + Id);
    }
}

public class UserEventAnnotation
{
    public int Id { get; set; }
    public string Note { get; set; } = string.Empty;
}