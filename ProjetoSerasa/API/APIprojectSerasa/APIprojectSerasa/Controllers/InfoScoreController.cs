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
    public class InfoScoreController : ApiController
    {
        companyEntities bd = new companyEntities();
        // GET: api/InfoScore
        public IEnumerable<dynamic> Get()
        {
            var infoScore = from info in bd.InfoScore
                            select new { info.scoreComp, info.openDebt, info.launchNF };
            return infoScore;
        }

        // GET: api/InfoScore/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/InfoScore
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/InfoScore/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/InfoScore/5
        public void Delete(int id)
        {
        }
    }
}
