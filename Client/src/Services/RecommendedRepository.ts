import { ProductCardProps } from "../Utils/types";
import { BaseRepository } from "./BaseRepository";

class RecommendedRepository extends BaseRepository<ProductCardProps>{
    collection = 'recommended';

    getMany(){
        return super.getAll();
    }   
}

export default RecommendedRepository;