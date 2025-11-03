import {
  ConditionTypeEnum,
  LogicalOperatorEnum,
} from "../constants/query.constant";

export interface QueryCondition {
  field?: string;
  operator?: string;
  value?: string | number | boolean;
  type: ConditionTypeEnum;
  logicalOperator?: LogicalOperatorEnum;
  conditions?: QueryCondition[];
  queryString?: string;
}
