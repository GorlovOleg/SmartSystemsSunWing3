using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetAllCustomer();
        Task<bool> SaveCustomer(Customer model);
        Task<bool> DeleteCustomerByID(int id); 
    }
}
