/*
Author          : Sr Programmer Analyst Oleg Gorlov
Description:	: Controller Class Employee. 
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
    public class EmployeeController : Controller
    {
        public IEmployeeRepository EmployeeRepo;

        public EmployeeController(IEmployeeRepository employeeRepo)
        {
            EmployeeRepo = employeeRepo;
        }

        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> GetEmployees()
        {
            var data = await EmployeeRepo.GetAllEmployee();
            return Json(new { result = data });
        }

        [HttpPost, Produces("application/json")]
        public async Task<IActionResult> SaveEmployee([FromBody] Employee model)
        {
            return Json(await EmployeeRepo.SaveEmployee(model));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployeeByID(int id)
        {
            return Json(await EmployeeRepo.DeleteEmployeeByID(id));
        }

    }
}
