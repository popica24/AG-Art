using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Domain.Category.Models;

namespace AGART.Application.Common.Interfaces.Persistance;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<bool> CategoryExists(int id);
}
