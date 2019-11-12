import { sp, Web } from '@pnp/sp';

export interface ICommonService {
    getListItems: (listTitle: string, selectString: string, expandString: string) => Promise<any>;
}
export class CommonService implements ICommonService {
    constructor() {
    }

    public getListItems(listTitle: string, filterString?: string, selectString?: string, expandString?: string): Promise<any> {
        return sp.web.lists.getByTitle(listTitle).items.filter(filterString).select(selectString).expand(expandString).get()
            .then((response) => response);
    }
}