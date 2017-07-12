using Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AnnouncementsService
    {
        public IList<AnnouncementList> GetAll()
        {
            var mockUpList = new List<AnnouncementList>();
            mockUpList.Add(new AnnouncementList { Title = "Improve security", CreationDate = DateTime.Now.AddDays(-85),  Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum augue egestas eros facilisis, non aliquam massa sagittis. Cras porta erat nec mauris lacinia varius. Nulla a neque finibus, cursus purus ut, bibendum turpis. Duis fringilla lorem ac ullamcorper imperdiet. Pellentesque turpis sapien, molestie eu bibendum at, ornare ac dolor." });
            mockUpList.Add(new AnnouncementList { Title = "Ready for summer?", CreationDate = DateTime.Now.AddDays(-75), Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum augue egestas eros facilisis, non aliquam massa sagittis. Cras porta erat nec mauris lacinia varius. Nulla a neque finibus, cursus purus ut, bibendum turpis. Duis fringilla lorem ac ullamcorper imperdiet. Pellentesque turpis sapien, molestie eu bibendum at, ornare ac dolor." });
            mockUpList.Add(new AnnouncementList { Title = "New hirings!", CreationDate = DateTime.Now.AddDays(-25), Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum augue egestas eros facilisis, non aliquam massa sagittis. Cras porta erat nec mauris lacinia varius. Nulla a neque finibus, cursus purus ut, bibendum turpis. Duis fringilla lorem ac ullamcorper imperdiet. Pellentesque turpis sapien, molestie eu bibendum at, ornare ac dolor." });
            mockUpList.Add(new AnnouncementList { Title = "The CEO is being honored", CreationDate = DateTime.Now.AddDays(-2), Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum augue egestas eros facilisis, non aliquam massa sagittis. Cras porta erat nec mauris lacinia varius. Nulla a neque finibus, cursus purus ut, bibendum turpis. Duis fringilla lorem ac ullamcorper imperdiet. Pellentesque turpis sapien, molestie eu bibendum at, ornare ac dolor." });
            return mockUpList;
        }
    }
}
