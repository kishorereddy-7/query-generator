import {
  ConditionTypeEnum,
  LogicalOperatorEnum,
  FieldTypeEnum,
} from "../constants/query.constant";

export interface QueryCondition {
  field?: string;
  fieldType?: FieldTypeEnum;
  operator?: string;
  value?: string | number | boolean;
  type: ConditionTypeEnum;
  logicalOperator?: LogicalOperatorEnum;
  conditions?: QueryCondition[];
  queryString?: string;
}
