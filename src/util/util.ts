import {
  FindManyOptions,
  FindOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryFyndAllBaseDtoType } from './base/dto';

export const getColumnsFormEntity = <T>(repo: Repository<T>): string[] => {
  const entityMetadata = repo.metadata;
  const columns = entityMetadata.columns.map((column) => column.propertyName);
  return columns;
};

export const getCommonsFilterValues = <T>(
  filter: QueryFyndAllBaseDtoType,
): FindManyOptions<T> => {
  const { take, skip, includeDeleted, order, orderBy } = filter;
  const commonsFilter: FindManyOptions<T> = {
    take,
    skip,
    withDeleted: includeDeleted,
    order: {} as FindOptionsOrder<T>,
  };
  if (orderBy) commonsFilter.order[orderBy] = order;
  return commonsFilter;
};

export const transformQueryStringArray = (value: string | string[]) => {
  return Array.isArray(value)
    ? value
    : value !== undefined
      ? [value]
      : undefined;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomElementsFromArray = <T>(
  array: T[],
  count: number,
): T[] => {
  const shuffledArray = [...array];
  const arrayLength = array.length;
  const randomElements: T[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomNumber(0, arrayLength);
    const element = shuffledArray.splice(randomIndex, 1)[0];
    randomElements.push(element);
  }
  return randomElements;
};
