import React, { useState } from 'react';
import axios from 'axios';

export const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = <T extends { id: number }>(
  baseUrl: string
): [T[], typeof service] => {
  const [resources, setResources] = useState<T[]>([]);

  let token = '';

  const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get<T[]>(baseUrl);
    setResources(response.data);
  };

  const create = async (resource: Omit<T, 'id'>) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post<T>(baseUrl, resource, config);
    setResources(resources.concat(response.data));
  };

  const update = async (id: number, resource: T) => {
    const response = await axios.put<T>(`${baseUrl} /${id}`, resource);
    const newResources = resources.map((resource) => {
      return resource.id === id ? response.data : resource;
    });
    setResources(newResources);
  };

  const service = {
    setToken,
    getAll,
    create,
    update,
  };

  return [resources, service];
};
