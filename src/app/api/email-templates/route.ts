import { mockEmailTemplates, mockEmailTemplatesInfo } from "./mockData";

const emailTemplatesInfo = mockEmailTemplatesInfo;
const emailTemplates = mockEmailTemplates;
export async function GET() {
  return new Response(JSON.stringify(emailTemplatesInfo));
}

