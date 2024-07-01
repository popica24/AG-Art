import { ProductCardProps } from "../Utils/types";
import { BaseRepository } from "./BaseRepository";

class LatestAddedRepository extends BaseRepository<ProductCardProps>{
    collection = 'latest';

    getMany(){
        return super.getAll();
    }   
}

export default LatestAddedRepository;