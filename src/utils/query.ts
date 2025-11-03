import { OperatorEnum } from "../constants/query.constant";
import { QueryCondition } from "../interfaces/query.interface";

export const getQueryString = (query: QueryCondition) => {
  if (query.operator === OperatorEnum.CONTAINS) {
    return ` ${query.field} LIKE '%${query.value}%'`;
  } else if (query.operator === OperatorEnum.DOES_NOT_CONTAIN) {
    return ` ${query.field} NOT LIKE '%${query.value}%'`;
  }

  return ` ${query.field} ${query.operator} "${query.value}"`;
};
