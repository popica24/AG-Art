using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;

namespace AGART.Domain.Common.Errors;

public static partial class Errors
{
    public static class Category
    {
        public static Error CategoryDoesNotExist(string msg = null) => Error.Unexpected(code: "ERRCAT001", description: msg ?? "Category does not exist.");
    }
}