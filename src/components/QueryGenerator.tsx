import React, { useEffect } from "react";
import { QueryCondition } from "../interfaces/query.interface";
import QueryForm from "./QueryForm";
import {
  ConditionTypeEnum,
  FieldEnum,
  OperatorEnum,
} from "../constants/query.constant";
import { getQueryString } from "../utils/query";

function QueryGenerator() {
  const [queryList, setQueryList] = React.useState<QueryCondition[]>([
    {
      field: FieldEnum.NAME,
      operator: OperatorEnum.IS,
      value: "",
      type: ConditionTypeEnum.RULE,
      queryString: getQueryString({
        field: FieldEnum.NAME,
        operator: OperatorEnum.IS,
        value: "",
        type: ConditionTypeEnum.RULE,
      }),
    },
  ]);
  const [queryString, setQueryString] = React.useState<string>("");
  const [globalLogicalOperator, setGlobalLogicalOperator] =
    React.useState<string>("AND");

  useEffect(() => {
    let string = "";
    queryList.forEach((query, index) => {
      if (query.type === ConditionTypeEnum.GROUP) {
        query.conditions?.forEach((gQuery, gIndex) => {
          string +=
            (gIndex === 0 ? " (" : "") +
            gQuery.queryString +
            (gIndex === query.conditions?.length! - 1
              ? " )"
              : " " + query.logicalOperator);
        });
      } else {
        string +=
          query.queryString +
          (index === queryList.length - 1 ? "" : " " + globalLogicalOperator);
      }
    });
    setQueryString(string);
  }, [queryList, globalLogicalOperator]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Query Condition Builder</h1>
      <p className="mb-4">
        Build complex query conditions using the visual editor below. You can
        add rules, create one level of nested groups, and see the resulting
        query string update in real-time
      </p>

      <div className="card bg-gray-800 p-6 rounded-2xl mb-6">
        {queryList.map((query, index) => (
          <div key={index}>
            <QueryForm
              query={query}
              onChange={setQueryList}
              index={index}
              globalLogicalOperator={globalLogicalOperator}
              setGlobalLogicalOperator={setGlobalLogicalOperator}
            />
          </div>
        ))}
      </div>

      <h1 className="text-white text-2xl">Generated Query String</h1>
      <div className="bg-black border-t border-gray-800 rounded-2xl my-4">
        <div className="container mx-auto px-4 py-3">
          <span className="text-green-400 font-mono text-sm">
            <code className="ml-2">WHERE {queryString}</code>
          </span>
        </div>
      </div>
    </div>
  );
}

export default QueryGenerator;
