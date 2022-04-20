import { Comment, commentService } from '@smart-invest/common';
import { getObjFromQueryString } from 'src/helpers';
import useSWRInfinite from 'swr/infinite';

export const useComments = (companyId?: number, pageSize: number = 10) => {
  const {
    data,
    size,
    setSize = () => {},
    error,
    mutate,
  } = useSWRInfinite(
    (index: number) => {
      if (!companyId) return null;

      const params = `company_id=${companyId}&page=${index + 1}`;
      return [`/comments?${params}`, params];
    },
    async (_: string, params: string) => {
      const res = await commentService.getComments({
        ...getObjFromQueryString(params),
        companyId,
      });
      return res;
    },
    {
      revalidateOnFocus: false,
    },
  );

  const isLoading = !data && !error;
  const isEmpty = !data?.[0].comments.length;
  const hasMore = !(data?.[data?.length - 1]?.comments?.length < pageSize);

  const comments: Comment[] =
    data?.reduce((acc, curr) => [...acc, ...curr.comments], []) || [];

  const fetchNextPage = () => {
    setSize((prevState) => {
      return prevState + 1;
    });
  };

  return {
    isLoading,
    isEmpty,
    hasMore,
    comments,
    page: size,
    fetchNextPage,
    refreshData: mutate,
  };
};
