import { v4 as uuidv4 } from "uuid";
import { mockUsers } from "./mockData";
import { mockRoles } from "../roles/mockData";

const users = mockUsers;
const roles = mockRoles;

export async function GET(req: any, res: any) {
  const usersWithRoles = users.map(user => {
    return ({
      ...user,
      groups: user.groups.map(g => roles.find(r => r.id == g))
    })
  })
  return new Response(JSON.stringify(usersWithRoles));
}