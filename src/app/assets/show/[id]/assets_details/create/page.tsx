// "use client";

// import { Create, useForm } from "@refinedev/antd";
// import { Form } from "antd";
// import AssetsDetailsFormItems from "../AssetsDetailsFormItems";
// import { useParams } from "next/navigation";

// export default function CreateAssetDetailPage() {
//   const { id, detailid } = useParams();
//   const { formProps, saveButtonProps, queryResult } = useForm({
//     resource: `assets/${id}/assets_details`,
//     id: detailid.toString(),
//   });

//   return (
//     <Create saveButtonProps={saveButtonProps}>
//       <Form {...formProps} layout="vertical">
//         <AssetsDetailsFormItems />
//       </Form>
//     </Create>
//   );
// }
