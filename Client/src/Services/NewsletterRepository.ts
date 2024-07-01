import { BaseRepository } from "./BaseRepository";

class NewsletterRepository extends BaseRepository<string>{
    collection = 'newsletter';

    create(email: string){
        return super.create(email)
    }

   
}

export default NewsletterRepository;