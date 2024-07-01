using ErrorOr;

namespace AGART.Domain.Common.Errors;

public static partial class Errors
{
    public static class Product
    {
        public static Error ProductDoesNotExist(string msg = null) => Error.NotFound(code: "ERRPROD001", description: msg ?? "Product does not exist.");
        public static Error NoResultsMatched(string msg = null) => Error.NotFound(code: "ERRPROD002", description: msg ?? "No results matched the search parameters.");
    }
}
