using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;

namespace AGART.Domain.Common.Errors;

public static partial class Errors
{
    public static class General
    {
        public static Error Internal(string msg = null) => Error.Unexpected(code: "ERRINTERN001", description: msg ?? "Internal error occured.");
    }
}