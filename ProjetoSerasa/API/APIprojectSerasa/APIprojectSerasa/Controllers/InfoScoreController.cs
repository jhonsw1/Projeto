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
                            select new { info.id, info.scoreComp, info.openDebt, info.launchNF, info.valueDebt };
            return infoScore;
        }

        // GET: api/InfoScore/5
        public dynamic Get(int id)
        {
            var infoScore = from info in bd.InfoScore where info.id.Equals(id)
                            select new { info.scoreComp, info.openDebt, info.launchNF };
            return infoScore;
        }

        // POST: api/InfoScore
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/InfoScore/5
        public void Put(int id, [FromBody]InfoScore value)
        {
            InfoScore change = bd.InfoScore.Find(id);
            change.launchNF = value.launchNF;
            change.openDebt = value.openDebt;
            change.valueDebt = value.valueDebt;
            change.scoreComp = value.scoreComp;
            bd.SaveChanges();
        }

        // DELETE: api/InfoScore/5
        public void Delete(int id)
        {
        }
    }
}
