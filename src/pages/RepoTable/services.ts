import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPO } from '../../shared/utils/graphql/queries';
import { getOptions } from './utils';

import { RepoNode } from '../../shared/types';

type RepoData = {
  search: {
    nodes: RepoNode[],
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
      hasPreviousPage: boolean;
      startCursor: string;
    }
  }
}

export const useTable = () => {
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')
  const [useLast, setUseLast] = useState(false)
  const { data, loading, error } = useQuery<RepoData>(GET_REPO, getOptions({ nextPage, previousPage, useLast }));

  const getNextList = () => {
    if (data) {
      const { pageInfo: { hasNextPage, endCursor } } = data.search;

      if (hasNextPage) {
        if (useLast) setUseLast(false);

        setNextPage(endCursor)
      }
    }
  }

  const getPreviousList = () => {
    if (data) {
      const { pageInfo: { hasPreviousPage, startCursor } } = data.search;

      if (hasPreviousPage) {
        setUseLast(true);
        setNextPage('')
        setPreviousPage(startCursor)
      }
    }
  }

  return {
    data,
    loading,
    error,
    getNextList,
    getPreviousList
  }
}