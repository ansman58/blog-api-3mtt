import { Request } from "express";

export function paginationHelper(request: Request): {
  page: number;
  limit: number;
} {
  const query = request.query;
  const defaultPage = 1;
  const defaultLimit = 2;

  if (
    (query.page && isNaN(parseInt(query.page as string))) ||
    (query.limit && isNaN(parseInt(query.limit as string)))
  ) {
    return { page: defaultPage, limit: defaultLimit };
  }

  const page = parseInt(query.page as string) || defaultPage;
  const limit = parseInt(query.limit as string) || defaultLimit;

  return { page, limit };
}

type ISort = "asc" | "desc";
export function orderingHelper(request: Request): {
  sort_read_count: ISort;
  sort_reading_time: ISort;
  sort_createdAt: ISort;
  sort_updatedAt: ISort;
} {
  const { read_count, reading_time, createdAt, updatedAt } = request.query;

  // Set default sort direction for each parameter
  let sort_read_count: ISort = "desc";
  let sort_reading_time: ISort = "desc";
  let sort_createdAt: ISort = "desc";
  let sort_updatedAt: ISort = "desc";

  // Set sort direction based on query parameters
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

export function searchHelper(request: Request): { search: string } {
  const query = request.query;
  const defaultSearch = "";

  if (!query.search) {
    return { search: defaultSearch };
  }

  const modifiedQuery = query.search as string;

  return { search: modifiedQuery };
}
