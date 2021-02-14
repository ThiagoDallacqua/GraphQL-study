import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from '../../components/Table';

import { RepoNode } from '../../shared/types/types';

import styles from './styles.module.scss';

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

type GetOptionsArgs = { nextPage: string, previousPage: string, useLast: boolean }

// to go to the next page use $after and with endCursor of the current page and $start
// to go to the previous page, use $before with startCursor of the current page and $last

const GET_REPO = gql`
    query GetRepo ($query: String!, $type: SearchType!, $first: Int, $last: Int, $after: String, $before: String ) {
     search(query: $query, type: $type, first: $first, last:$last, after: $after, before: $before) {
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
        }
        nodes {
          ... on Repository {
            id
            name
            forkCount
            stargazerCount
            url
          }
        }
      }
    }
`;

const getOptions = ({ nextPage, previousPage, useLast }: GetOptionsArgs) => {
  return {
    variables: {
      query: 'react',
      type: 'REPOSITORY',
      first: !useLast ? 10 : undefined,
      last: useLast ? 10 : undefined,
      after: nextPage || undefined,
      before: previousPage || undefined
    }
  }
}

const RepoTable: FC = () => {
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')
  const [useLast, setUseLast] = useState(false)
  const { data, loading, error } = useQuery<RepoData>(GET_REPO, getOptions({ nextPage, previousPage, useLast }));

  const previousButtonStyle = cn(styles.button, { [styles.disabled]: !data?.search.pageInfo.hasPreviousPage })
  const nextButtonStyle = cn(styles.button, { [styles.disabled]: !data?.search.pageInfo.hasNextPage })

  const getComponent = () => {
    if (loading) return <p>Loading...</p>

    if (!data || error) return <p>No data or error, try again</p>

    return <Table data={data?.search.nodes} />
  }

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

  return (
    <div className={styles.root}>
      {getComponent()}

      <div className={styles.buttonsContainer}>
        <button className={previousButtonStyle} onClick={getPreviousList}>previous</button>
        <button className={nextButtonStyle} onClick={getNextList}>next</button>
      </div>
    </div>
  )
};

export default RepoTable;
