import { EmailTemplate } from "@/types/types";

const mockSenderInfo = {
  name: 'Support',
  address: 'support@example.com'
}

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'license_key_created',
    title: 'Default License key created email Template',
    subject: 'License key created',
    cc: 'Created cc',
    bcc: 'Created bcc',
    body: `<p>Hello,</p>
<p>Thank you for joining us at {APP_NAME}.</p>
<p>Click on the button below to verify your email address.</p>
<p>
  <a class="btn" href="{ACTION_URL}" target="_blank" rel="noopener">Verify</a>
</p>
<p>
  Thanks,<br/>
  {APP_NAME} team
</p>`
  },
  {
    id: 'license_key_1_month',
    title: 'Default License key 1 month reminder email Template',
    subject: 'License key 1 month reminder',
    cc: '1 month reminder cc',
    bcc: '1 month reminder bcc',
    body: `<p>Hello,</p>
<p>Thank you for joining us at {APP_NAME}.</p>
<p>Click on the button below to verify your email address.</p>
<p>
  <a class="btn" href="{ACTION_URL}" target="_blank" rel="noopener">Verify</a>
</p>
<p>
  Thanks,<br/>
  {APP_NAME} team
</p>`
  },
  {
    id: 'license_key_2_month',
    title: 'Default License key 2 month reminder email Template',
    subject: 'License key 2 month reminder',
    cc: '2 month reminder cc',
    bcc: '2 month reminder bcc',
    body: `<p>Hello,</p>
<p>Thank you for joining us at {APP_NAME}.</p>
<p>Click on the button below to verify your email address.</p>
<p>
  <a class="btn" href="{ACTION_URL}" target="_blank" rel="noopener">Verify</a>
</p>
<p>
  Thanks,<br/>
  {APP_NAME} team
</p>`
  },
  {
    id: 'license_key_renewal_due',
    title: 'Default License key Renewal Due email Template',
    subject: 'License key Renewal Due',
    cc: 'Renewal cc',
    bcc: 'Renewal bcc',
    body: `<p>Hello,</p>
<p>Thank you for joining us at {APP_NAME}.</p>
<p>Click on the button below to verify your email address.</p>
<p>
  <a class="btn" href="{ACTION_URL}" target="_blank" rel="noopener">Verify</a>
</p>
<p>
  Thanks,<br/>
  {APP_NAME} team
</p>`
  },
  {
    id: 'licesen_key_expired',
    title: 'Default License key expired after 1 month email Template',
    subject: 'License key expired after 1 month',
    cc: 'Expired after 1 month cc',
    bcc: 'Expired after 1 month bcc',
    body: `<p>Hello,</p>
<p>Thank you for joining us at {APP_NAME}.</p>
<p>Click on the button below to verify your email address.</p>
<p>
  <a class="btn" href="{ACTION_URL}" target="_blank" rel="noopener">Verify</a>
</p>
<p>
  Thanks,<br/>
  {APP_NAME} team
</p>`
  },
]

export const mockEmailTemplatesInfo = {
  sender: mockSenderInfo,
  emailTemplates: mockEmailTemplates
}