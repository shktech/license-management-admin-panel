// "use client";
// import { Form } from "antd";
// import { useParams } from "next/navigation";
// import AssetsDetailsFormItems from "../../AssetsDetailsFormItems";
// import { Edit, useForm } from "@refinedev/antd";
// import dayjs from "dayjs";

// const EditAssetDetailsPage = () => {
//   const { id, detailid } = useParams();
//   const { formProps, saveButtonProps, queryResult } = useForm({
//     resource: `assets/${id}/assets_details`,
//     id: detailid.toString(),
//   });
//   console.log(queryResult);

//   const formInit = {
//     ...queryResult?.data?.data,
//     creation_date: dayjs(),
//     end_date: dayjs(),
//     last_update_date: dayjs(),
//     start_date: dayjs(),
//     transaction_date: dayjs(),
//   };

//   return (
//     <Edit saveButtonProps={saveButtonProps}>
//       <Form {...formProps} layout="vertical" initialValues={formInit}>
//         <AssetsDetailsFormItems />
//       </Form>
//     </Edit>
//   );
// };

// export default EditAssetDetailsPage;
