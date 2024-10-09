import { FindManyOptions, FindOptions, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { QueryFyndAllBaseDtoType } from './base/dto';

export const getColumnsFormEntity = <T>(repo: Repository<T>): string[] => {
  const entityMetadata = repo.metadata;
  const columns = entityMetadata.columns.map((column) => column.propertyName);
  return columns;
};

export const getCommonsFilterValues = <T>(filter:QueryFyndAllBaseDtoType):FindManyOptions<T> => {
  const {
    take,
    skip,
    includeDeleted,
    order,
    orderBy
  } = filter;
  const commonsFilter:FindManyOptions<T> = {
    take,
    skip,
    withDeleted: includeDeleted,
    order: {} as FindOptionsOrder<T>,
  };
  if (orderBy) commonsFilter.order[orderBy] = order;
  return commonsFilter;
}