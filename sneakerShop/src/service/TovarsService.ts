import $api, { TOVARS_URL } from "../http";


export default class TovarsService{

    static async getSneakers(sizes: number[], brands: number[], idcompanys: object, colors: object, name: string, price:number) {
        const brandsStr = brands.join(',');
        const sizesStr = sizes.join(',');
    
        return $api.get(`${TOVARS_URL}/sneakers?name=${name}&sizes=${sizesStr}&brands=${brands}&idcompanys=${idcompanys}&colors=${colors}&price=${price}`);
    }
    static async getOneSneaker(idTovar:number){
        return $api.post(`${TOVARS_URL}/sneakerOne`, {idTovar:idTovar})
    }
    static async getCompanySneakers(idCompany:number){
        return $api.post(`${TOVARS_URL}/getCompanySneaker`, [idCompany])
    }
    static async getSizes( ){
        return $api.get(`${TOVARS_URL}/sizes`)
    }
    static async getBrands( ){
        return $api.get(`${TOVARS_URL}/brands`)
    }
    static async getColors( ){
        return $api.get(`${TOVARS_URL}/sizes`)
    }

}

