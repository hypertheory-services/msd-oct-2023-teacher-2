using Microsoft.EntityFrameworkCore;

namespace SoftwareCenter.Data;

public class SoftwareDataContext : DbContext
{

    public SoftwareDataContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<SoftwareInventoryItemEntity> Titles { get; set; }
    public DbSet<UserIssueEntity> UserIssues { get; set; }

    public IQueryable<SoftwareInventoryItemEntity> GetActiveTitles()
    {
        return Titles.Where(t => t.Retired == false);
    }





}
