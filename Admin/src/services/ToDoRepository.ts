import { Order } from "../utils/types";
import { BaseRepository } from "./BaseRepository";

class ToDoRepository extends BaseRepository<Order>{
    collection = 'fullorders';

    getMany(){
        return super.getAll();
    }
}

export default ToDoRepository;