using Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AmericanBankAndTrustInternal.Controllers
{
    public class AnnouncementsController : Controller
    {
        private AnnouncementsService _service;

        public AnnouncementsController()
        {
            _service = new AnnouncementsService();
        }

        public ActionResult Index()
        {
            var model = _service.GetAll();
            return View(model);
        }
    }
}