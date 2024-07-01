import { AxiosResponse } from "axios";
import { HttpClient } from "../Utils/HttpClient";
const BASE_URL = import.meta.env.VITE_API_URL
export interface IBaseRepository<T>
  {
    create(item: T): Promise<ApiResponse<T[]>>;
    get(id: any): Promise<ApiResponse<T>>;
    getAll(): Promise<ApiResponse<T[]>>;
    update(id: any, item: T): Promise<ApiResponse<T>>;
    delete(id: any): Promise<ApiResponse<T>>;
    custom(path:string):Promise<ApiResponse<T[]>>
  }

export class ApiResponse<T>{
    data?:T;
    // succeeded?: boolean;
    // errors: any;
}

const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    return new Promise((resolve, reject) => {
      if(response != undefined){
        const result: ApiResponse<any> = {
          data: response,
        };
        resolve(result)
      }
      reject();
    });
  };

  export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T>{
    public async custom(path: string): Promise<ApiResponse<T[]>> {
      const instance = this.createInstance();
      const result = await instance.get(`${BASE_URL}/${this.collection}/${path}`).then(transform);
      return result as ApiResponse<T[]>
    }

      public async get(id: any): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.get(`${BASE_URL}/${this.collection}/${id}`).then(transform);
        return result as ApiResponse<T>
      }

      public async getAll(): Promise<ApiResponse<T[]>> {
        const instance = this.createInstance();
        const result = await instance.get(`${BASE_URL}/${this.collection}`).then(transform);
        return result as ApiResponse<T[]>;
      }

      public async create(item: T): Promise<ApiResponse<T[]>> {
        const instance = this.createInstance();
        const result = await instance.post(`${BASE_URL}/${this.collection}`, item).then(transform);
        return result as ApiResponse<T[]>;
      }

      public async update(id: any, item: T): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.put(`${BASE_URL}/${this.collection}/${id}`, item).then(transform);
        return result as ApiResponse<T>;
      }

      public async delete(id: any): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.delete(`${BASE_URL}/${this.collection}/${id}`).then(transform);
        return result as ApiResponse<T>;
      }
      

    protected collection: string | undefined;
  }