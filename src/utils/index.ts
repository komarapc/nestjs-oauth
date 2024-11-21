import { z } from 'zod';

export const excludeObjectFields = <T>(obj: T, fields: string[]) => {
  const newObj = { ...obj };
  fields.forEach((field) => {
    delete newObj[field];
  });
  return newObj;
};

type QueryPagination = { page: number; limit: number };
type MetaPagination = {
  current_page: number | null;
  next_page: number | null;
  prev_page: number | null;
  total_data: number;
  total_page: number;
};
export const metaPagination = (query: QueryPagination, total: number) => {
  const totalPage = Math.ceil(total / query.limit);
  const currentPage = query.page > totalPage ? totalPage : query.page;
  const nextPage = currentPage + 1 > totalPage ? null : currentPage + 1;
  const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
  const pagination: MetaPagination = {
    total_data: total,
    total_page: totalPage,
    current_page: currentPage,
    next_page: nextPage,
    prev_page: prevPage,
  };
  return pagination;
};

export const zodErrorHandle = (error: any) => {
  let hasError = false;
  let errors = [];
  if (error instanceof z.ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      name: err.path.join('.'),
      message: err.message,
    }));
    hasError = true;
    errors = formattedErrors;
  }
  return { hasError, errors };
};

export const filteredEmptyObj = (data: any) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v !== undefined && v !== null && v !== '',
    ),
  );
  const length = Object.keys(filteredData).length;
  return { data: filteredData, length };
};
