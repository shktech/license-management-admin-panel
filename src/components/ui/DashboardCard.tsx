// import React from "react";
// import { Card, Space } from "antd";

// interface DashboxProps {
//   icon: any;
//   name: string;
//   value: string;
//   sublabel?: string;
//   hideSublabel?: boolean;
// }

// export default function Dashbox({ icon, value, name, sublabel }: DashboxProps) {
//   return (
//     <Card
//       style={{
//         borderRadius: "10px",
//         height: "120px",
//         background: "var(--primary)",
//       }}
//     >
//       <Space
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           width: "100%",
//         }}
//       >
//         {icon}
//         <div style={{ textAlign: "right" }}>
//           <h4 style={{ color: "#fff", fontSize: "30px", lineHeight: 1 }}>
//             {value}
//           </h4>
//           <h6
//             style={{
//               color: "#fff",
//               fontSize: "16px",
//               marginTop: 8,
//               fontWeight: 400,
//               lineHeight: 1.3,
//             }}
//           >
//             {name}
//           </h6>
//           {sublabel && (
//             <p style={{ color: "#eee", fontSize: "12px", fontWeight: 500 }}>
//               {sublabel}
//             </p>
//           )}
//         </div>
//       </Space>
//     </Card>
//   );
// }
