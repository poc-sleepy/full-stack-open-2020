import React from 'react';
import { useParams } from 'react-router';
import { RepositoryItem } from './RepositoryList/RepositoryItem';

export const SingleRepository: React.FC = () => {
  const id = useParams<{ id: string }>().id;

  const repository = {
    id: 'jaredpalmer.formik',
    name: 'jaredpalmer.formik',
    ownerName: 'Matti',
    createdAt: '2021-12-01T00:00:00',
    fullName: `jaredpalmer/formik:${id}`,
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1619,
    stargazersCount: 21856,
    ratingAverage: 88,
    reviewCount: 3,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  };

  return <RepositoryItem repository={repository} isSingle={true} />;
};
