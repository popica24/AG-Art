using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Category.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Repositories;

public class CategoryRepository(AppDbContext context) : GenericRepository<Category>(context), ICategoryRepository
{
    public async Task<bool> CategoryExists(int id)
    {
        return await context.Category.AnyAsync(c => c.Id == id);
    }
}
