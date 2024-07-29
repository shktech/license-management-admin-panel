import { mockEmailTemplates, mockEmailTemplatesInfo } from "../mockData";

const emailTemplatesInfo = mockEmailTemplatesInfo;
export async function GET() {
  return new Response(JSON.stringify(emailTemplatesInfo));
}

