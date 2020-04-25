import { City } from "./Types";

export default class CitiesApiHelper {
    async getAll(): Promise<Array<City>> {
        const json = await import('../static/cities.json');
        const cities = json.localidades.map((x) => this.parseLocalidadToCity(x));
        return cities;
    }
    async getByProvince(provinceId: number): Promise<Array<City>> {
        const json = await import('../static/cities.json');
        const cities = json.localidades.filter(x => Number(x.provincia.id) === provinceId).map((x) => this.parseLocalidadToCity(x));
        return cities;
    }
    parseLocalidadToCity(localidad: any): City {
        return { name: localidad.nombre, id: Number(localidad.id), lat: localidad.centroide.lat, lon: localidad.centroide.lon };
    }
}