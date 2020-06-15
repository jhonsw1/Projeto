using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using APIprojectSerasa.Models;
namespace APIprojectSerasa.Controllers
{
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class CompanyController : ApiController
    {
        companyEntities bd = new companyEntities();
        // GET: api/Company
        public IEnumerable<dynamic> Get()
        {
            var company = from comp in bd.infoComp
                          select comp;
            return company;
        }

        // GET: api/Company/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Company
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Company/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Company/5
        public void Delete(int id)
        {
        }
    }
}
