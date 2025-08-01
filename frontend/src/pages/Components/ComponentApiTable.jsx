import { useTranslation } from "@/services/translation";
import ComponentApiTableItem from "./ComponentApiTableItem";

export default function ComponentApiTable({ items }) {
  const { t } = useTranslation();

  return (
    <table className="oyk-components-api-table">
      <thead className="oyk-components-api-table-head">
        <tr className="oyk-components-api-table-head-row">
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody className="oyk-components-api-table-body">
        {items.map((item, index) => (
          <ComponentApiTableItem key={index} {...item} />
        ))}
      </tbody>
    </table>
  );
}
