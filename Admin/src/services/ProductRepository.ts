import { Product, PostProduct } from "../utils/types";
import { BaseRepository } from "./BaseRepository";

class ProductRepository extends BaseRepository<Partial<Product>>{
    collection = 'product';
    update(id: number, data: Partial<Product>){
        return super.update(id, data);
    }
    create(model: PostProduct){
        return super.create(model);
    }
    getAll(){
        return super.getAll()
    }
    
}

export default ProductRepository;