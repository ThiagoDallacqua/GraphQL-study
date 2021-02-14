type GetOptionsArgs = { nextPage: string, previousPage: string, useLast: boolean, query: string }

export const getOptions = ({ nextPage, previousPage, useLast, query }: GetOptionsArgs) => {
  return {
    variables: {
      query,
      type: 'REPOSITORY',
      first: !useLast ? 10 : undefined,
      last: useLast ? 10 : undefined,
      after: nextPage || undefined,
      before: previousPage || undefined
    }
  }
}
