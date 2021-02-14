type GetOptionsArgs = { nextPage: string, previousPage: string, useLast: boolean }

export const getOptions = ({ nextPage, previousPage, useLast }: GetOptionsArgs) => {
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
