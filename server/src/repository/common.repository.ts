import { Pagination } from 'src/types/data-types/auth-user.type';
import { EntityType, QueryOption } from 'src/types/enum-types/common.enum';
import { transformWhereQuery } from 'src/utils/transformer.util';
import { getManager, Repository } from 'typeorm';

export const getEntity = async (
  entity_name?: string,
  entity_id?: number,
  get?: QueryOption,
): Promise<any> => {
  const result = await getManager()
    .createQueryBuilder(entity_name, 'entity')
    .where('id = :entity_id', { entity_id: entity_id })
    .execute();

  return get === QueryOption.GetMany ? result : result[0];
};

export const countEntityRecord = async (
  repository: Repository<any>,
  where: any,
) => {
  return await repository.count(where);
};

export const getEntityPagination = async (
  queryOption: { use: QueryOption; repository?: Repository<any> },
  entity_type: EntityType,
  where: any,
  pagination: Pagination,
  relation?: string[],
): Promise<any> => {
  console.log('where...0', where);

  const takeQuery = pagination.page_size ? pagination.page_size : 10;
  const orderByQuery = pagination.order_by ? pagination.order_by : 'id';
  const orderQuery = pagination.order ? pagination.order : 'DESC';
  const skipQuery = pagination.page_number
    ? (pagination.page_number - 1) * pagination.page_size
    : 0;

  if (queryOption.use === QueryOption.UseQueryBuilder) {
    let stringWhere = where;
    let paramWhere = {};
    if (typeof where !== 'string') {
      const { stringQuery, paramQuery } = transformWhereQuery(where, true);
      stringWhere = stringQuery;
      paramWhere = paramQuery;
    }
    return await getManager()
      .createQueryBuilder(entity_type, entity_type)
      .where(stringWhere, paramWhere)
      .skip(skipQuery)
      .take(takeQuery)
      .orderBy(orderByQuery, orderQuery)
      .execute();
  } else if (queryOption.use === QueryOption.UseRepository) {
    return await queryOption.repository.find({
      relations: relation,
      where: where,
      take: takeQuery,
      skip: skipQuery,
      orderBy: orderByQuery,
    });
  }
};
export const updateEntityByField_Value = async (entity_type: EntityType, queryObj: object, payload: any) => {
  let fields = Object.keys(queryObj)
  let whereString = ''
  let whereParam = {...queryObj}
  fields.forEach(((field, idx)=>{
    whereString += (idx>0? 'AND' : '') + `${field} = :${field}`
  }))

  return await getManager()
    .createQueryBuilder(entity_type, entity_type)
    .update(entity_type)
    .set(payload)
    .where(whereString, whereParam)
    .execute();
}
