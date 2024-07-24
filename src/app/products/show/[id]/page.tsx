// "use client";

// import { Show, TextField } from "@refinedev/antd";
// import { useShow } from "@refinedev/core";
// import { Typography } from "antd";

// const { Title } = Typography;

// export default function ProductShow() {
//   const { queryResult } = useShow({});
//   const { data, isLoading } = queryResult;

//   const record = data?.data;

//   return (
//     <Show isLoading={isLoading}>
//       <Title level={5}>ID</Title>
//       <TextField value={record?.id} />
//       <Title level={5}>Attribute 1</Title>
//       <TextField value={record?.attribute1} />
//       <Title level={5}>Attribute 2</Title>
//       <TextField value={record?.attribute2} />
//       <Title level={5}>Attribute 3</Title>
//       <TextField value={record?.attribute3} />
//       <Title level={5}>Attribute 4</Title>
//       <TextField value={record?.attribute4} />
//       <Title level={5}>Attribute 5</Title>
//       <TextField value={record?.attribute5} />
//       <Title level={5}>Created By</Title>
//       <TextField value={record?.created_by} />
//       <Title level={5}>Creation Date</Title>
//       <TextField value={record?.creation_date} />
//       <Title level={5}>Duration</Title>
//       <TextField value={record?.duration} />
//       <Title level={5}>Enabled Flag</Title>
//       <TextField value={record?.enabled_flag} />
//       <Title level={5}>Evaluation Set Name</Title>
//       <TextField value={record?.eval_set_name} />
//       <Title level={5}>Last Update Date</Title>
//       <TextField value={record?.last_update_date} />
//       <Title level={5}>Last Updated By</Title>
//       <TextField value={record?.last_updated_by} />
//       <Title level={5}>License Source Set</Title>
//       <TextField value={record?.license_source_set} />
//       <Title level={5}>New Set Name</Title>
//       <TextField value={record?.new_set_name} />
//       <Title level={5}>Organization Code</Title>
//       <TextField value={record?.organization_code} />
//       <Title level={5}>OSC Product ID</Title>
//       <TextField value={record?.osc_product_id} />
//       <Title level={5}>Product Description</Title>
//       <TextField value={record?.product_description} />
//       <Title level={5}>Product ID</Title>
//       <TextField value={record?.product_id} />
//       <Title level={5}>Product Name</Title>
//       <TextField value={record?.product_name} />
//       <Title level={5}>Renewal Set Name</Title>
//       <TextField value={record?.renewal_set_name} />
//       <Title level={5}>Source Name</Title>
//       <TextField value={record?.source_name} />
//       <Title level={5}>Vendor Name</Title>
//       <TextField value={record?.vendor_name} />
//       <Title level={5}>Vendor Part Number</Title>
//       <TextField value={record?.vendor_part_number} />
//     </Show>
//   );
// }
