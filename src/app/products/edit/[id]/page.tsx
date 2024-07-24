// "use client";

// import ProductsFormItems from "@app/products/ProductsFormItems";
// import { Edit, useForm } from "@refinedev/antd";
// import { Form } from "antd";
// import dayjs from "dayjs";

// export default function ProductEdit() {
//   const { formProps, saveButtonProps, queryResult } = useForm({});

//   const formInit = {
//     ...queryResult?.data?.data,
//     creation_date: dayjs(),
//     last_update_date: dayjs(),
//   };

//   return (
//     <Edit saveButtonProps={saveButtonProps}>
//       <Form {...formProps} layout="vertical" initialValues={formInit}>
//         <ProductsFormItems />
//       </Form>
//     </Edit>
//   );
// }
