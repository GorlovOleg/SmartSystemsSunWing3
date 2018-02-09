using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using BusinessLibrary.Model;

namespace BusinessLibrary
{
    public class CustomerRepository : ICustomerRepository 
    {
        async Task<List<Model.Customer>> ICustomerRepository.GetAllCustomer()  
        {
            using (ContactDBContext db = new ContactDBContext())
            {
                return await (from a in db.Customer
                              select new Model.Customer
                              {
                                  CustomerId = a.CustomerId,
                                  FirstName = a.FirstName,
                                  LastName = a.LastName,
                                  Phone = a.Phone,
                                  Gender = a.Gender,
                                  Email = a.Email,
                                  Birthday = a.Birthday

                              }).ToListAsync();
            }
        }

        async Task<bool> ICustomerRepository.SaveCustomer(Model.Customer model)
        {
            using (ContactDBContext db = new ContactDBContext())
            {
                DataAccessLibrary.Models.Customer customer = db.Customer.Where(x => x.CustomerId == model.CustomerId).FirstOrDefault();
                if (customer == null)
                {
                    customer = new DataAccessLibrary.Models.Customer()
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Phone = model.Phone,
                        Gender = model.Gender,
                        Email = model.Email,
                        Birthday = model.Birthday
                    };
                    db.Customer.Add(customer);

                }
                else
                {
                    customer.FirstName = model.FirstName;
                    customer.LastName = model.LastName;
                    customer.Phone = model.Phone;
                    customer.Gender = model.Gender;
                    customer.Email = model.Email;
                    customer.Birthday = model.Birthday;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        async Task<bool> ICustomerRepository.DeleteCustomerByID(int id)
        {
            using (ContactDBContext db = new ContactDBContext())
            {

                DataAccessLibrary.Models.Customer customer = db.Customer.Where(x => x.CustomerId == id).FirstOrDefault();
                if (customer != null)
                {
                    db.Customer.Remove(customer);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
