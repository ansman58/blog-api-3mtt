"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHelper = exports.orderingHelper = exports.paginationHelper = void 0;
function paginationHelper(request) {
    const query = request.query;
    const defaultPage = 1;
    const defaultLimit = 2;
    if ((query.page && isNaN(parseInt(query.page))) ||
        (query.limit && isNaN(parseInt(query.limit)))) {
        return { page: defaultPage, limit: defaultLimit };
    }
    const page = parseInt(query.page) || defaultPage;
    const limit = parseInt(query.limit) || defaultLimit;
    return { page, limit };
}
exports.paginationHelper = paginationHelper;
function orderingHelper(request) {
    const { read_count, reading_time, createdAt, updatedAt } = request.query;
    let sort_read_count = "desc";
    let sort_reading_time = "desc";
    let sort_createdAt = "desc";
    let sort_updatedAt = "desc";
    if (read_count === "asc") {
        sort_read_count = "asc";
    }
    if (reading_time === "asc") {
        sort_reading_time = "asc";
    }
    if (createdAt === "asc") {
        sort_createdAt = "asc";
    }
    if (updatedAt === "asc") {
        sort_updatedAt = "asc";
    }
    return {
        sort_read_count,
        sort_reading_time,
        sort_createdAt,
        sort_updatedAt,
    };
}
exports.orderingHelper = orderingHelper;
function searchHelper(request) {
    const query = request.query;
    const defaultSearch = "";
    if (!query.search) {
        return { search: defaultSearch };
    }
    const modifiedQuery = query.search;
    return { search: modifiedQuery };
}
exports.searchHelper = searchHelper;
