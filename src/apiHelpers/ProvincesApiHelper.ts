import { Province } from "./Types";


export default class ProvincesApiHelper {
    async getAll(): Promise<Array<Province>> {
        const json = await import('../static/provinces.json');
        const cities = json.provincias.map((x) => this.parseProvinciaToProvince(x));
        return cities;
    }
    parseProvinciaToProvince(provincia: any): Province {
        return { name: provincia.nombre, id: Number(provincia.id) };
    }
}