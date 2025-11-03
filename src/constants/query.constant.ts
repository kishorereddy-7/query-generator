export enum FieldTypeEnum {
  NUMERIC = "numeric",
  STATUS = "status",
  DEPARTMENT = "department",
  TEXT = "text",
}
export enum LogicalOperatorEnum {
  AND = "AND",
  OR = "OR",
}

export enum ConditionTypeEnum {
  RULE = "rule",
  GROUP = "group",
}

export enum OperatorEnum {
  IS = "IS",
  IS_NOT = "IS NOT",
  CONTAINS = "CONTAINS",
  DOES_NOT_CONTAIN = "DOES NOT CONTAIN",
}

export const OPERATORS = [
  { label: "Is", value: OperatorEnum.IS },
  { label: "Is Not", value: OperatorEnum.IS_NOT },
  { label: "Contains", value: OperatorEnum.CONTAINS },
  { label: "Does Not Contain", value: OperatorEnum.DOES_NOT_CONTAIN },
];

export enum FieldEnum {
  NAME = "name",
  AGE = "age",
  STATUS = "status",
  DEPARTMENT = "department",
  SALARY = "salary",
  EMAIL = "email",
}

export const FIELDS = [
  { label: "Name", value: FieldEnum.NAME },
  { label: "Age", value: FieldEnum.AGE },
  { label: "Status", value: FieldEnum.STATUS },
  { label: "Department", value: FieldEnum.DEPARTMENT },
  { label: "Salary", value: FieldEnum.SALARY },
  { label: "Email", value: FieldEnum.EMAIL },
];

export const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
  { label: "Archived", value: "archived" },
];

export const DEPARTMENT_OPTIONS = [
  { label: "HR", value: "hr" },
  { label: "Engineering", value: "engineering" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
];

export const NUMERIC_OPERATORS = [
  { value: "=", label: "=" },
  { value: ">=", label: ">=" },
  { value: "<=", label: "<=" },
  { value: "!=", label: "!=" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
];

export const FIELD_META: {
  [key in FieldEnum]: {
    fieldType: FieldTypeEnum;
    defaultOperator: OperatorEnum | string;
  };
} = {
  [FieldEnum.NAME]: {
    fieldType: FieldTypeEnum.TEXT,
    defaultOperator: OperatorEnum.CONTAINS,
  },
  [FieldEnum.AGE]: {
    fieldType: FieldTypeEnum.NUMERIC,
    defaultOperator: "=",
  },
  [FieldEnum.STATUS]: {
    fieldType: FieldTypeEnum.STATUS,
    defaultOperator: OperatorEnum.IS,
  },
  [FieldEnum.DEPARTMENT]: {
    fieldType: FieldTypeEnum.DEPARTMENT,
    defaultOperator: OperatorEnum.IS,
  },
  [FieldEnum.SALARY]: {
    fieldType: FieldTypeEnum.NUMERIC,
    defaultOperator: "=",
  },
  [FieldEnum.EMAIL]: {
    fieldType: FieldTypeEnum.TEXT,
    defaultOperator: OperatorEnum.IS,
  },
};
