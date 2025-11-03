import { QueryCondition } from "../interfaces/query.interface";
import {
  LogicalOperatorEnum,
  ConditionTypeEnum,
  FieldEnum,
  OperatorEnum,
} from "../constants/query.constant";
import RuleRow from "./RuleRow";
import { on } from "events";

interface QueryFormProps {
  query: QueryCondition;
  // accept the React state dispatcher so parent can pass setState directly
  onChange: React.Dispatch<React.SetStateAction<QueryCondition[]>>;
  globalLogicalOperator: string;
  setGlobalLogicalOperator: React.Dispatch<React.SetStateAction<string>>;
  index: number;
}

const QueryForm = ({
  query,
  onChange,
  globalLogicalOperator,
  setGlobalLogicalOperator,
  index,
}: QueryFormProps) => {
  const handleSetOperator = (op: LogicalOperatorEnum) => {
    if (query.type === ConditionTypeEnum.GROUP) {
      onChange((prev) => {
        const updated = [...prev];
        updated[index].logicalOperator = op;
        return updated;
      });
    } else {
      setGlobalLogicalOperator(op);
    }
  };

  const handleAddRule = () => {
    const newRule: QueryCondition = {
      field: FieldEnum.NAME,
      operator: OperatorEnum.IS,
      value: "",
      type: ConditionTypeEnum.RULE,
      queryString: ` ${FieldEnum.NAME} ${OperatorEnum.IS} "${""}"`
    };
    onChange((prev) => {
      const updated = [...prev];
      if (query.type === ConditionTypeEnum.GROUP) {
        const groupConditions = updated[index].conditions || [];
        updated[index].conditions = [...groupConditions, newRule];
      } else {
        updated.push(newRule);
      }
      return updated;
    });
  };

  const handleAddGroup = () => {
    const newGroup: QueryCondition = {
      type: ConditionTypeEnum.GROUP,
      conditions: [
        {
          field: FieldEnum.NAME,
          operator: OperatorEnum.IS,
          value: "",
          type: ConditionTypeEnum.RULE,
          logicalOperator: LogicalOperatorEnum.AND,
          queryString: ` ${FieldEnum.NAME} ${OperatorEnum.IS} "${""}"`
        },
      ],
    };
    onChange((prev) => [...prev, newGroup]);
  };

  const handleDeleteRule = (i: number) => {
    onChange((prev) => {
      const updated = [...prev];
      if (query.type === ConditionTypeEnum.GROUP) {
        const groupConditions = updated[index].conditions || [];
        updated[index].conditions = groupConditions.filter(
          (_, idx) => idx !== i
        );
      } else {
        return updated.filter((_, idx) => idx !== i);
      }
      return updated;
    });
  };

  const getLogicalOperator = () => {
    if (query.type === ConditionTypeEnum.GROUP) {
      return query.logicalOperator || LogicalOperatorEnum.AND;
    }
    return globalLogicalOperator;
  };

  return (
    <div
      className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-2 ${
        query.type === ConditionTypeEnum.GROUP
          ? "ml-4 border-l-4 border-orange-400 dark:border-orange-300 pl-4"
          : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {(index === 0 || query.type === ConditionTypeEnum.GROUP) && (
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => handleSetOperator(LogicalOperatorEnum.AND)}
              className={
                `px-4 py-2 text-sm font-medium rounded-l-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ` +
                (getLogicalOperator() === LogicalOperatorEnum.AND
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600")
              }
            >
              AND
            </button>
            <button
              type="button"
              onClick={() => handleSetOperator(LogicalOperatorEnum.OR)}
              className={
                `px-4 py-2 text-sm font-medium rounded-r-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ` +
                (getLogicalOperator() === LogicalOperatorEnum.OR
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600")
              }
            >
              OR
            </button>
          </div>
        )}

        <div className="flex-grow flex flex-wrap gap-2">
          {(index === 0 || query.type === ConditionTypeEnum.GROUP) && (
            <button
              type="button"
              onClick={(e) => {
                handleAddRule();
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Rule
            </button>
          )}
          {index === 0 && (
            <button
              type="button"
              onClick={handleAddGroup}
              className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-plus"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Add Group
            </button>
          )}
        </div>
        {query.type === ConditionTypeEnum.GROUP && (
          <button
            className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-gray-600"
            title="Delete Rule"
            onClick={() => {
              onChange((prev) => prev.filter((_, idx) => index !== idx));
            }}
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

      <div className="space-y-4">
        {query?.type === ConditionTypeEnum.GROUP ? (
          (query?.conditions ?? []).map((cond, i) => (
            <RuleRow
              key={i}
              query={cond}
              groupIndex={i}
              index={index}
              onChange={onChange}
              onDelete={handleDeleteRule}
            />
          ))
        ) : (
          <RuleRow
            query={query}
            index={index}
            onChange={onChange}
            onDelete={handleDeleteRule}
          />
        )}
      </div>
    </div>
  );
};

export default QueryForm;
