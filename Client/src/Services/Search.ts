import { ProductQueryParameters } from "../Utils/types";
import { BaseRepository } from "./BaseRepository";

class Search extends BaseRepository<Partial<ProductQueryParameters>>{
    collection = "search"

    create(query: Partial<ProductQueryParameters>){
        return super.create(query)
    }
}
export default Search;