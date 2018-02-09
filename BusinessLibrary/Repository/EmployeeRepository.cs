using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
//using BusinessLibrary.Model;
using System.Linq;
//using BusinessLibrary.Model;

namespace BusinessLibrary
{
    public class EmployeeRepository : IEmployeeRepository
    {
     
        async Task<List<Model.Employee>> IEmployeeRepository.GetAllEmployee()
        {
            using (ContactDBContext db = new ContactDBContext())
            {
                return await (from a in db.Employee
                              select new Model.Employee
                              {
                                  EmployeeId = a.EmployeeId,
                                  FirstName = a.FirstName,
                                  LastName = a.LastName,
                                  Gender = a.Gender,
                                  City = a.City,
                                  Department = a.Department,
                                  Phone = a.Phone

                              }).ToListAsync();

            }
        }

        async Task<bool> IEmployeeRepository.SaveEmployee(Model.Employee model)
        {
            using (ContactDBContext db = new ContactDBContext())
            {
                DataAccessLibrary.Models.Employee employee = db.Employee.Where(x => x.EmployeeId == model.EmployeeId).FirstOrDefault();
                if (employee == null)
                {
                    employee = new DataAccessLibrary.Models.Employee()
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Gender = model.Gender,
                        City = model.City,
                        Department = model.Department,
                        Phone = model.Phone
                    };
                    db.Employee.Add(employee);

                }
                else
                {
                    employee.FirstName = model.FirstName;
                    employee.LastName = model.LastName;
                    employee.Gender = model.Gender;
                    employee.City = model.City;
                    employee.Department = model.Department;
                    employee.Phone = model.Phone;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        async Task<bool> IEmployeeRepository.DeleteEmployeeByID(int id)
        {
            using (ContactDBContext db = new ContactDBContext())
            {

                DataAccessLibrary.Models.Employee employee = db.Employee.Where(x => x.EmployeeId == id).FirstOrDefault();
                if (employee != null)
                {
                    db.Employee.Remove(employee);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
