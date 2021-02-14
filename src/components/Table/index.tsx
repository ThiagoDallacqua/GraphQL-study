import React, { FC } from 'react';
import { RepoNode } from '../../shared/types';

import styles from './styles.module.scss';

type Props = {
  data: RepoNode[];
}

const Table: FC<Props> = ({ data }) => {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <span>Name</span>
        <span>🌟 Stars</span>
        <span>🍴 Forks</span>
      </div>

      {
        data.map(({ id, name, stargazerCount, forkCount, url }) => (
          <div key={id} className={styles.row}>
            <span><a title={url} className={styles.link} href={url}>{name}</a></span>
            <span>{stargazerCount}</span>
            <span>{forkCount}</span>
          </div>
        ))
      }
    </div>
  )
}

export default Table;
