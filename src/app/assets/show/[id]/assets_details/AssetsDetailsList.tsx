// import {
//   DeleteButton,
//   EditButton,
//   ShowButton,
//   useTable,
//   List,
// } from "@refinedev/antd";
// import { BaseRecord } from "@refinedev/core";
// import { Space, Table } from "antd";
// import { useParams } from "next/navigation";

// const AssetsDetailsList = () => {
//   const { id } = useParams();
//   const { tableProps } = useTable({
//     syncWithLocation: true,
//     resource: `assets/${id}/assets_details`,
//   });

//   return (
//     <List title="Asset Details" breadcrumb={null}>
//       <Table {...tableProps} rowKey="id">
//         <Table.Column dataIndex="action" title="Action" />
//         <Table.Column dataIndex="license_key" title="License Key" />
//         <Table.Column
//           dataIndex="license_transaction_id"
//           title="License Transaction ID"
//         />
//         <Table.Column dataIndex="ocs_part_id" title="OCS Part ID" />
//         <Table.Column dataIndex="osc_part_number" title="OSC Part Number" />
//         <Table.Column dataIndex="seat_number" title="Seat Number" />
//         <Table.Column dataIndex="start_date" title="Start Date" />
//         <Table.Column dataIndex="transaction_date" title="Transaction Date" />
//         <Table.Column
//           dataIndex="transaction_number"
//           title="Transaction Number"
//         />
//         <Table.Column
//           title="Actions"
//           dataIndex="actions"
//           render={(_, record: BaseRecord) => (
//             <Space>
//               <EditButton
//                 hideText
//                 size="small"
//                 recordItemId={record.id}
//                 resource="assets_details"
//                 meta={{ detailsid: record.id, assetid: id }}
//               />
//               <ShowButton
//                 hideText
//                 size="small"
//                 recordItemId={record.id}
//                 resource="assets_details"
//                 meta={{ detailsid: record.id, assetid: id }}
//               />
//               <DeleteButton
//                 hideText
//                 size="small"
//                 recordItemId={record.id}
//                 resource="assets_details"
//                 meta={{ detailsid: record.id, assetid: id }}
//               />
//             </Space>
//           )}
//         />
//       </Table>
//     </List>
//   );
// };

// export default AssetsDetailsList;
