import { DonorBloodTypes } from 'src/modules/user/donor/model/donor.record';
import { loadJsonFromFile } from '../utils/load-json-from-file';

interface ILocalDB {
    facilities: [{
        id: string;
        name: string;
        address: string;
        bloodType: DonorBloodTypes[];
        urgency: string;
        stock: [{
            type: DonorBloodTypes;
            stock: number;
            expiry: string;
        }];
        hours: string;
    }]
}

export async function fetchLocalDB(): Promise<ILocalDB> {
    const db = await loadJsonFromFile<ILocalDB>("../../../data/db.json");
    return db;
}