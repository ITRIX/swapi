export interface PagerQuery {
    searchKey?: string;
    pageNo?: number;
    [prop: string]: any;
}

export const defaultPagerQuery: PagerQuery = {
    pageNo: 1,
    searchKey: ''
};
