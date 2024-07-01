import { Product } from "../Utils/types";
import { BaseRepository } from "./BaseRepository";

class ProductRepository extends BaseRepository<Product>{
    collection = 'product';

    getAll(){
        return super.getAll();
    }

    get(id:number){
        return super.get(id);
    }

    create(data: Product){
        return super.create(data)
    }

    update(id: number, data:Product){
        return super.update(id, data);
    }

    delete(id:number){
        return super.delete(id)
    }
}

export default ProductRepository;