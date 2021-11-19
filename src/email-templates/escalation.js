import capitalize from "../utils/capitalize";
import dateFormatter from "../utils/date-formatter";
import daysSince from "../utils/days-since";
import Regulations from "../utils/regulations";

export default {
  subject(requestItem) {
    const regulation = Regulations[requestItem.regulationType.S];
    const requestType = regulation['requestTypes'][requestItem.requestType.S];
    return `Complaint against "${requestItem.companyName.S}" regarding a ${requestItem.regulationType.S} Data ${capitalize(requestType.name)} Request.`;
  },
  body(requestItem, complaintText, status) {
    const regulation = Regulations[requestItem.regulationType.S];
    const requestType = regulation['requestTypes'][requestItem.requestType.S];
    const bodyParts = [];

    bodyParts.push('Dear Data Protection Agency,');
    bodyParts.push(`On ${new Intl.DateTimeFormat('en', { dateStyle: 'full'}).format(new Date(requestItem.requestCreatedAt.S))} I sent "${requestItem.companyName.S}" (website: ${requestItem.companyUrl.S}) a Data ${capitalize(requestType.name)} Request pursuant to article ${requestType.article} of the ${regulation.longName} (${regulation.displayName}).`);

    if (requestItem.reminderEmailSentAt.S) {
      bodyParts.push(`I have also sent the organization a reminder email on ${dateFormatter(new Date(requestItem.reminderEmailSentAt.S))}.`);
    }

    let reason = '';
    if (status === 'PARTIAL') {
      reason = 'the organization failed to fully comply with my request';
    } else if (status === 'DECLINED') {
      reason = 'the organization declined to comply with my request';
    } else if (status === 'NO_REPLY') {
      reason = 'the organization did not reply to my request';
    }
    const daysSinceRequest = daysSince(new Date(requestItem.requestCreatedAt.S));
    bodyParts.push(`I would like to file a formal complaint since ${reason}, which I have sent ${daysSinceRequest} days ago.`);

    if (complaintText) {
      bodyParts.push(`Additional details:\n${complaintText}`);
    }

    bodyParts.push(`Please keep me updated as to the status of your investigation. Please let me know if you would like me to provide any additional information. My preferred method of communication is email.`);

    /* bodyParts.push(`The original request was emailed from my personal email address. The text of the email was generated by YourDigitalRights.org, a website which automates the process of filing requestItem requests. The service has kindly kept a record of my request which you can view here.`); */
    
    bodyParts.push(`Please note that I have copied ${requestItem.companyName.S} to this email.`);
    bodyParts.push('Kind regards,');
    bodyParts.push(`${requestItem.name.S}`);
    
    return bodyParts.join('\n\n');
  },
};
