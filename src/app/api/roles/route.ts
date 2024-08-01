import { v4 as uuidv4 } from "uuid";
import { mockRoles } from "./mockData";

const roles = mockRoles;

export async function GET(req: any, res: any) {
  return new Response(JSON.stringify(roles));
}