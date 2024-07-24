// "use client";

// import { Show, TextField } from "@refinedev/antd";
// import { useShow } from "@refinedev/core";
// import { Typography } from "antd";
// import { useParams } from "next/navigation";
// const { Title } = Typography;

// const ShowAssetDetailPage = () => {
//   const { id, detailid } = useParams();
//   const { queryResult } = useShow({
//     resource: `assets/${id}/assets_details`,
//     id: detailid.toString(),
//   });
//   const { data, isLoading } = queryResult;
//   console.log(queryResult);

//   const record = data?.data;

//   return (
//     <Show isLoading={isLoading} title="Asset (Asset Details Below)">
//       <Title level={5}>Action</Title>
//       <TextField value={record?.action} />
//       <Title level={5}>Asset ID</Title>
//       <TextField value={record?.asset_id} />
//       <Title level={5}>Created By</Title>
//       <TextField value={record?.created_by} />
//       <Title level={5}>Creation Date</Title>
//       <TextField value={record?.creation_date} />
//       <Title level={5}>Duration</Title>
//       <TextField value={record?.duration} />
//       <Title level={5}>End Date</Title>
//       <TextField value={record?.end_date} />
//       <Title level={5}>ID</Title>
//       <TextField value={record?.id} />
//       <Title level={5}>Last Update Date</Title>
//       <TextField value={record?.last_update_date} />
//       <Title level={5}>Last Updated By</Title>
//       <TextField value={record?.last_updated_by} />
//       <Title level={5}>License Key</Title>
//       <TextField value={record?.license_key} />
//       <Title level={5}>License Server Status</Title>
//       <TextField value={record?.license_server_status} />
//       <Title level={5}>License Transaction ID</Title>
//       <TextField value={record?.license_transaction_id} />
//       <Title level={5}>OCS Part ID</Title>
//       <TextField value={record?.ocs_part_id} />
//       <Title level={5}>OSC License Status</Title>
//       <TextField value={record?.osc_license_status} />
//       <Title level={5}>OSC Part Number</Title>
//       <TextField value={record?.osc_part_number} />
//       <Title level={5}>Seat Number</Title>
//       <TextField value={record?.seat_number} />
//       <Title level={5}>Start Date</Title>
//       <TextField value={record?.start_date} />
//       <Title level={5}>Transaction Date</Title>
//       <TextField value={record?.transaction_date} />
//       <Title level={5}>Transaction Number</Title>
//       <TextField value={record?.transaction_number} />
//       <Title level={5}>Vendor Part Number</Title>
//       <TextField value={record?.vendor_part_number} />
//     </Show>
//   );
// };

// export default ShowAssetDetailPage;
