namespace SoftwareCenter.Data;

public class UserIssueEntity
{
    public int Id { get; set; }
    public string IssueId { get; set; } = string.Empty;
    public string User { get; set; } = string.Empty;
    public string SoftwareId { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
}

