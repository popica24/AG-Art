import { ToDoLamp } from "../utils/types";
import { BaseRepository } from "./BaseRepository";

class ToDoRepository extends BaseRepository<ToDoLamp>{
    collection = 'todo';

    getMany(){
        return super.getAll();
    }
}

export default ToDoRepository;