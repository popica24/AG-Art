using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Application.Common.Interfaces.Persistance;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Commands.Delete
{
    public class DeleteVariantCommandHandler(IUnitOfWork uow) : IRequestHandler<DeleteVariantCommand, ErrorOr<bool>>
    {
        public async Task<ErrorOr<bool>> Handle(DeleteVariantCommand request, CancellationToken cancellationToken)
        {
            uow.Variant.DeleteAsync(request.id);
            await uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}