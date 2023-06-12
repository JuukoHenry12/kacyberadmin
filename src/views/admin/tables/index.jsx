import CheckTable from "./components/CheckTable";
import { columnsDataCheck } from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
const Tables = () => {
  return (
    <div className="mt-5  h-full w-full">
      <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
    </div>
  );
};

export default Tables;
