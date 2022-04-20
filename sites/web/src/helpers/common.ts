import { Pagination } from '@smart-invest/common';
import { PaginationProps } from 'antd';

export const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const isScrollEnded = (event: React.UIEvent<HTMLDivElement>) => {
  const { scrollTop, offsetHeight, scrollHeight }: any = event.target;
  return Math.abs(scrollTop + offsetHeight - scrollHeight) <= 1;
};

export const convertPagination = (
  pagination?: Pagination,
): PaginationProps | false => {
  if (!pagination) return false;

  return {
    current: pagination.currentPage,
    total: pagination.totalItems,
    pageSize: pagination.pageSize,
  };
};

export const getObjFromQueryString = (
  str: string,
): { [key: string]: string } => {
  const urlParams = new URLSearchParams(str);
  const result: { [key: string]: string } = {};
  for (const pair of urlParams.entries()) {
    result[pair[0]] = pair[1];
  }
  return result;
};

export const hasMoreData = (pagination?: Pagination): boolean => {
  if (!pagination) return false;

  const { currentPage, pageSize, totalItems } = pagination;
  return currentPage * pageSize < totalItems;
};
