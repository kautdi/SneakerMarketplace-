import $api, { COMPANY_URL} from "../http";


export default class CompanyService{
    static async login(email:string, password:string) {
        return $api.post(`${COMPANY_URL}/login`, {email:email, password:password});
    }
    static async registration(email:string, password:string) {
        return $api.post(`${COMPANY_URL}/registration`, {email:email, password:password});
    }
    static async refreshToken(idcompany:number, token:string){
        return $api.post(`${COMPANY_URL}/refresh`, {refreshToken:token, idcompany:idcompany});
    }

}
