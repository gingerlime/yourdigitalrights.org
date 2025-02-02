import capitalize from "../utils/capitalize";
import daysSince from "../utils/days-since";
import Regulations from "../utils/regulations";

export default {
  subject(requestItem) {
    const regulation = Regulations[requestItem.regulationType.S];
    const requestType = regulation['requestTypes'][requestItem.requestType.S];
    const requestSentDate = requestItem.requestEmailSentAt ? requestItem.requestEmailSentAt.S : requestItem.requestCreatedAt.S;
    
    if (requestItem.regulationType.S === "LGPD") {
      return `Aviso: Minha Solicitação de ${capitalize(requestType.name)} de Dados ${regulation.displayName} enviada ${new Intl.DateTimeFormat('pt', { dateStyle: 'full'}).format(new Date(requestSentDate))} (ref: ${requestItem.id.S.split("-")[0]})`;
    } else {
      return `Reminder: My ${regulation.displayName} Data ${capitalize(requestType.name)} Request sent ${new Intl.DateTimeFormat('en', { dateStyle: 'full'}).format(new Date(requestSentDate))} (ref: ${requestItem.id.S.split("-")[0]})`;
    }
  },
  body(requestItem, status) {
    if (requestItem.regulationType.S === "LGPD") {
      const regulation = Regulations[requestItem.regulationType.S];
      const requestType = regulation['requestTypes'][requestItem.requestType.S];
      const bodyParts = [];
      const requestSentDate = requestItem.requestEmailSentAt ? requestItem.requestEmailSentAt.S : requestItem.requestCreatedAt.S;

      bodyParts.push('A quem possa interessar:');
      bodyParts.push(`No ${new Intl.DateTimeFormat('pt', { dateStyle: 'full'}).format(new Date(requestSentDate))} enviei uma solicitação de ${capitalize(requestType.name)} de Dados por e-mail, de acordo com o artigo ${requestType.article} da ${regulation.longName} (${regulation.displayName}).`);

      if (status === 'PARTIAL') {
        bodyParts.push('Até o momento, vocês não atenderam integralmente a minha solicitação.');
      } else if (status === 'DECLINED') {
        bodyParts.push('Até agora, vocês se recusaram a atender a minha solicitação.');
      } else if (status === 'NO_REPLY') {
        bodyParts.push('Até o momento, não recebi resposta a minha solicitação.');
      }

      const daysSinceRequest = daysSince(new Date(requestSentDate));
      if (daysSinceRequest > requestType.timeLimit) {
        bodyParts.push(`Se passaram ${daysSinceRequest} desde que o pedido foi encaminhado, razão pela qual vocês estão agora violando o artigo ${requestType.article} da ${regulation.displayName}.`);
      }
      bodyParts.push(`Envio este e-mail para reiterar o meu pedido e me reservo o direito de encaminhar a minha solicitação à ${regulation.dpa.longName} caso vocês não a cumpram integralmente, nos termos da lei.`);
    
    
      /* bodyParts.push(`A solicitação original foi enviada por e-mail através do meu endereço eletrônico pessoal. O texto do e-mail foi gerado por YourDigitalRights.org, um website que automatiza o processo de solicitação de direitos do titular. O serviço gentilmente manteve um registro da minha solicitação que você pode visualizar aqui.`); */
      

      bodyParts.push('Atenciosamente,');
      bodyParts.push(requestItem.name.S);

      return bodyParts.join('\n\n');
    } else {
      const regulation = Regulations[requestItem.regulationType.S];
      const requestType = regulation['requestTypes'][requestItem.requestType.S];
      const bodyParts = [];
      const requestSentDate = requestItem.requestEmailSentAt ? requestItem.requestEmailSentAt.S : requestItem.requestCreatedAt.S;
  
      bodyParts.push('To whom it may concern:');
      bodyParts.push(`On ${new Intl.DateTimeFormat('en', { dateStyle: 'full'}).format(new Date(requestSentDate))} I sent you a Data ${capitalize(requestType.name)} Request via email, pursuant to article ${requestType.article} of the ${regulation.longName} (${regulation.displayName}).`);
  
      if (status === 'PARTIAL') {
        bodyParts.push('So far you have failed to fully comply with my request.');
      } else if (status === 'DECLINED') {
        bodyParts.push('So far you have refused to comply with my request.');
      } else if (status === 'NO_REPLY') {
        bodyParts.push('So far I did not receive a reply to my request.');
      }
  
      const daysSinceRequest = daysSince(new Date(requestSentDate));
      if (daysSinceRequest > requestType.timeLimit) {
        bodyParts.push(`Since it has been ${daysSinceRequest} since the request was sent you are now in violation of section ${requestType.article} of the ${regulation.displayName}.`);
      }
      bodyParts.push(`I am sending this email to remind you of my request, and reserve the right to escalate the matter to the ${regulation.dpa.longName} if you do not fully comply with it.`);
     
     
      /* bodyParts.push(`The original request was emailed from my personal email address. The text of the email was generated by YourDigitalRights.org, a website which automates the process of filing requestItem requests. The service has kindly kept a record of my request which you can view here.`); */
      
  
      bodyParts.push('Kind regards,');
      bodyParts.push(requestItem.name.S);
  
      return bodyParts.join('\n\n');  
    }
  },
};