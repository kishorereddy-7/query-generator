import React from "react";
import { QueryCondition } from "../interfaces/query.interface";
import { getQueryString } from "../utils/query";
import {
  FIELDS,
  NUMERIC_OPERATORS,
  OPERATORS,
  STATUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  OperatorEnum,
  FieldTypeEnum,
  FIELD_META,
  FieldEnum,
} from "../constants/query.constant";

interface RuleRowProps {
  query: QueryCondition;
  index: number;
  groupIndex?: number;
  onChange: React.Dispatch<React.SetStateAction<QueryCondition[]>>;
  onDelete: (i: number) => void;
}

const RuleRow = ({
  query,
  index,
  groupIndex,
  onChange,
  onDelete,
}: RuleRowProps) => {

  const handleChangeField = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: "field" | "operator" | "value"
  ) => {
    onChange((prev) => {
      const updated = [...prev];
      if (groupIndex !== undefined) {
        const groupConditions = updated[index].conditions || [];
        if (type === "field") {
          const meta = FIELD_META[e.target.value as FieldEnum];
          groupConditions[groupIndex] = {
            ...groupConditions[groupIndex],
            [type]: e.target.value,
            fieldType: meta?.fieldType ?? FieldTypeEnum.TEXT,
          };
          groupConditions[groupIndex].value = "";
          if (meta?.defaultOperator) {
            groupConditions[groupIndex].operator =
              meta.defaultOperator as string;
          }
        } else {
          groupConditions[groupIndex] = {
            ...groupConditions[groupIndex],
            [type]: e.target.value,
          };
        }
        groupConditions[groupIndex].queryString = getQueryString(
          groupConditions[groupIndex]
        );
        updated[index].conditions = groupConditions;
      } else {
        if (type === "field") {
          const meta = FIELD_META[e.target.value as FieldEnum];
          updated[index] = {
            ...updated[index],
            [type]: e.target.value,
            fieldType: meta?.fieldType ?? FieldTypeEnum.TEXT,
          };
          updated[index].value = "";
          if (meta?.defaultOperator) {
            updated[index].operator = meta.defaultOperator as string;
          }
        } else {
          updated[index] = {
            ...updated[index],
            [type]: e.target.value,
          };
        }
        updated[index].queryString = getQueryString(updated[index]);
      }
      return updated;
    });
  };

  const meta = query.field ? FIELD_META[query.field as FieldEnum] : undefined;
  const fType = query.fieldType ?? meta?.fieldType ?? FieldTypeEnum.TEXT;

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
      <select
        className="w-full sm:w-48 flex-shrink-0 border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query.field}
        onChange={(e) => {
          handleChangeField(e, "field");
        }}
      >
        {FIELDS.map((field) => {
          return (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          );
        })}
      </select>

      <select
        className="w-full sm:w-40 flex-shrink-0 border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query.operator}
        onChange={(e) => {
          handleChangeField(e, "operator");
        }}
      >
        {fType === FieldTypeEnum.STATUS || fType === FieldTypeEnum.DEPARTMENT
          ? [
              { label: "Is", value: OperatorEnum.IS },
              { label: "Is Not", value: OperatorEnum.IS_NOT },
            ].map((operator) => (
              <option key={operator.value} value={operator.value}>
                {operator.label}
              </option>
            ))
          : fType === FieldTypeEnum.NUMERIC
          ? NUMERIC_OPERATORS.map((operator) => (
              <option key={operator.value} value={operator.value}>
                {operator.label}
              </option>
            ))
          : OPERATORS.map((operator) => (
              <option key={operator.value} value={operator.value}>
                {operator.label}
              </option>
            ))}
      </select>

      {fType === FieldTypeEnum.STATUS ? (
        <select
          className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={String(query.value ?? "")}
          onChange={(e) => handleChangeField(e, "value")}
        >
          <option value="">Select status</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : fType === FieldTypeEnum.DEPARTMENT ? (
        <select
          className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={String(query.value ?? "")}
          onChange={(e) => handleChangeField(e, "value")}
        >
          <option value="">Select department</option>
          {DEPARTMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter value"
          type={fType === FieldTypeEnum.NUMERIC ? "number" : "text"}
          value={String(query.value ?? "")}
          onChange={(e) => {
            handleChangeField(e, "value");
          }}
        />
      )}

      {index > 0 && (
        <button
          className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-gray-600"
          title="Delete Rule"
          onClick={() =>
            onDelete(groupIndex !== undefined ? groupIndex : index)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash2 lucide-trash-2"
            aria-hidden="true"
          >
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
            <path d="M3 6h18"></path>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default RuleRow;
