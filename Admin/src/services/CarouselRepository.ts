import { CarouselProps } from "../utils/types";
import { BaseRepository } from "./BaseRepository";

class CarouselRepository extends BaseRepository<CarouselProps>{
    collection = 'carousel';

    getMany(){
        return super.getAll();
    }

    update(id:number, item:CarouselProps){
        return super.update(id, item);
    }
}

export default CarouselRepository;