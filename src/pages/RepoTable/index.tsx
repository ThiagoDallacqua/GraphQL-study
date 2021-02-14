import React, { FC } from 'react';
import cn from 'classnames';

import Table from '../../components/Table';

import { useTable } from './services';

import styles from './styles.module.scss';

const RepoTable: FC = () => {
  const { search, data, loading, error, getNextList, getPreviousList, onChangeSearch, getNewSearch } = useTable()

  const previousButtonStyle = cn(styles.button, { [styles.disabled]: !data?.search.pageInfo.hasPreviousPage })
  const nextButtonStyle = cn(styles.button, { [styles.disabled]: !data?.search.pageInfo.hasNextPage })

  const getComponent = () => {
    if (loading) return <p>Loading...</p>

    if (!data || error) return <p>No data or error, try again</p>

    return <Table data={data?.search.nodes} />
  }

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <input className={styles.input} type="text" value={search} onChange={onChangeSearch} />

        <button className={styles.button} onClick={getNewSearch}>new search</button>
      </div>

      {getComponent()}

      <div className={styles.buttonsContainer}>
        <button className={previousButtonStyle} onClick={getPreviousList}>previous</button>
        <button className={nextButtonStyle} onClick={getNextList}>next</button>
      </div>
    </div>
  )
};

export default RepoTable;
