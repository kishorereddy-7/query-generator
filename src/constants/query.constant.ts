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
