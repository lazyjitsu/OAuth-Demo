const DEFAULT_PAGE_LIMIT = 0; // if 0, Mongo will return all


function getPagination(query) {
    // if negative,returns postive, if string, returns int, if positive returns 
    // itself
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const page = Math.abs(query.page) || 1;
    // first page = 0 * limit 
    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    }

}

module.exports = {
    getPagination,
}