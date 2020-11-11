  /**
   * generateQuery
   *
   * @description - create query params for the api.
   */
  export function generateQuery(root: string, pageNo: number, searchQuery = ''): string {
    const queryArray = [];
    queryArray.push(`${root}?page=${pageNo}`);
    if (searchQuery !== '') { queryArray.push(`&search=${searchQuery}`); }
    return queryArray.join('');
  }

  /**
   * extractId
   *
   * @description - return extracted id from the URL
   */
  export function extractId(rootUrl: string, detailUrl: string) {
    const extractedId = detailUrl
      .replace(rootUrl, '')
      .replace('/', '');
    return parseInt(extractedId);
  }
