using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllEmployee();
        Task<bool> SaveEmployee(Employee model);
        Task<bool> DeleteEmployeeByID(int id); 
    }
}
