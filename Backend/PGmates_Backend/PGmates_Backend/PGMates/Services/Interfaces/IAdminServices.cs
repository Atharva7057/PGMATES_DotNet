namespace PGMates.Services.Interfaces
{
    public interface IAdminServices
    {
        (int userCount, int ownerCount, int propertyCount) GetDashboardStats();
    }
}
