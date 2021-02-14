import gql from 'graphql-tag';

export const GET_REPO = gql`
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
