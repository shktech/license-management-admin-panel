// "use client";

// import AssetsFormItems from "@app/assets/AssetsFormItems";
// import { Edit, useForm } from "@refinedev/antd";
// import { Form } from "antd";
// import dayjs from "dayjs";

// export default function AssetEdit() {
//   const { formProps, saveButtonProps, queryResult } = useForm({});

//   const formInit = {
//     ...queryResult?.data?.data,
//     transaction_date: dayjs(),
//     start_date: dayjs(),
//     end_date: dayjs(),
//     last_update_date: dayjs(),
//     last_update_status_date: dayjs(),
//     creation_date: dayjs(),
//   };

//   return (
//     <Edit saveButtonProps={saveButtonProps}>
//       <Form {...formProps} layout="vertical" initialValues={formInit}>
//         <AssetsFormItems />
//       </Form>
//     </Edit>
//   );
// }
