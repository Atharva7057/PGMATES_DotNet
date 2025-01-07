namespace PGMates.Repository.Interfaces
{
    public interface IAdminRepository
    {
        int GetUserCount();
        int GetOwnerCount();
        int GetListedPropertyCount();
    }
}
