import $api, { ZAKAZ_URL } from "../http";


export default class ZakazService{

    static async createZakaz(zakaz:object){
        return $api.post(`${ZAKAZ_URL}/createZakaz`,zakaz)
    }

}

