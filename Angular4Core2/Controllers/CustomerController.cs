/*
Author          : Sr Programmer Analyst Oleg Gorlov
Description:	: Controller Class Customer. 
Copyright       : GMedia-IT-Consulting 
email           : oleg_gorlov@yahoo.com
Date            : 01/25/2018
Release         : 1.0.0
Comment         : Implementation MVC6, .NET C#, .NET Core 2
*/

using BusinessLibrary;
using BusinessLibrary.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Angular4Core2.Controllers
{
    public class CustomerController : Controller
    {
        public ICustomerRepository CustomerRepo;

        public CustomerController(ICustomerRepository customerRepo)
        {
            CustomerRepo = customerRepo;
        }

        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> GetCustomers()
        {
            var data = await CustomerRepo.GetAllCustomer();
            return Json(new { result = data });
        }

        [HttpPost, Produces("application/json")]
        public async Task<IActionResult> SaveCustomer([FromBody] Customer model)
        {
            return Json(await CustomerRepo.SaveCustomer(model));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCustomerByID(int id)
        {
            return Json(await CustomerRepo.DeleteCustomerByID(id)); 
        }

    }
}