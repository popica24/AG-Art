import { UserContactProps } from "../utils/types";
import { BaseRepository } from "./BaseRepository";

class ClientRepository extends BaseRepository<UserContactProps>{
    collection = 'customers';

    getMany(){
        return super.getAll();
    }
}

export default ClientRepository;