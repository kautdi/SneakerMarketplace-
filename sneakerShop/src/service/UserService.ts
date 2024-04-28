import $api, { USER_URL } from "../http";


export default class UserService{

    static async login(email:string, password:string) {
        return $api.post(`${USER_URL}/login`, {email:email, password:password});
    }
    static async registration(email:string, password:string) {
        return $api.post(`${USER_URL}/registration`, {email:email, password:password});
    }
    static async refreshToken(idUser:number, token:string){
        return $api.post(`${USER_URL}/refresh`, {refreshToken:token, idUser:idUser});
    }
    static async getOneuser(iduser:number){
        return $api.post(`${USER_URL}/getOneUser`, {iduser:iduser});
    }

}

