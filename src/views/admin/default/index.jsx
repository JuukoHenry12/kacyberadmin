
import { columnsDataComplex } from "./variables/columnsData";
import ComplexTable from "views/admin/default/components/ComplexTable";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  return (

    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>
 
  );
};

export default Dashboard;
