import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              name: 'jaredpalmer.formik',
              ownerName: 'Matti',
              createdAt: '2021-12-01T00:00:00',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              name: 'async-library.react-async',
              ownerName: 'Kalle',
              createdAt: '2021-10-23T15:00:00',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      // Repository [0]
      expect(getAllByTestId('repositoryFullName')[0]).toHaveTextContent(
        'jaredpalmer/formik'
      );
      expect(getAllByTestId('repositoryDescription')[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(getAllByTestId('repositoryLanguage')[0]).toHaveTextContent(
        'TypeScript'
      );
      expect(getAllByTestId('repositoryStargazers')[0]).toHaveTextContent(
        '21.8 k'
      );
      expect(getAllByTestId('repositoryForks')[0]).toHaveTextContent('1.6 k');
      expect(getAllByTestId('repositoryReviews')[0]).toHaveTextContent('3');
      expect(getAllByTestId('repositoryRatingAverage')[0]).toHaveTextContent(
        '88'
      );

      // Repository [1]
      expect(getAllByTestId('repositoryFullName')[1]).toHaveTextContent(
        'async-library/react-async'
      );
      expect(getAllByTestId('repositoryDescription')[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      expect(getAllByTestId('repositoryLanguage')[1]).toHaveTextContent(
        'JavaScript'
      );
      expect(getAllByTestId('repositoryStargazers')[1]).toHaveTextContent(
        '1.7 k'
      );
      expect(getAllByTestId('repositoryForks')[1]).toHaveTextContent('69');
      expect(getAllByTestId('repositoryReviews')[1]).toHaveTextContent('3');
      expect(getAllByTestId('repositoryRatingAverage')[1]).toHaveTextContent(
        '72'
      );
    });
  });
});
