import { Variant } from "../utils/types";
import { BaseRepository } from "./BaseRepository";

class VariantRepository extends BaseRepository<Partial<Variant>>{
    collection = 'variant';

    create(variant: Partial<Variant>){
        return super.create(variant);
    }
    delete(id:number){
        return super.delete(id)
    }
}

export default VariantRepository;