import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Sort,
  ColumnModel,
} from "@syncfusion/ej2-react-grids";
import { Container } from "rsuite";
import { OCloumns } from "./SalesForce";

const SalseForce = () => {
  const createColumnModel = (OCloumns: any) => {
    return OCloumns.map((colObj: any) => {
      let ColumnModel: ColumnModel = {
        field: colObj["field"],
        headerText: colObj["headerText"],
        width: colObj["width"],
        allowSorting: colObj["allowSorting"],
        allowFiltering: colObj["allowFiltering"],
        allowSearching: colObj["allowSearching"],
        type: colObj["type"],
        visible: colObj["visible"],
      };

      return ColumnModel;
    });
  };
  return (
    <GridComponent allowSorting={true} >
    <ColumnsDirective>
        <ColumnDirective field='OrderID' width='100' textAlign="Right" allowSorting={true} allowFiltering={true}/>
        <ColumnDirective field='CustomerID' width='100' allowSorting={true} allowFiltering={true}/>
        <ColumnDirective field='EmployeeID' width='100' textAlign="Right"/>
        <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right"/>
        <ColumnDirective field='ShipCountry' width='100'/>
    </ColumnsDirective>
</GridComponent>
  );
};
export default SalseForce;
