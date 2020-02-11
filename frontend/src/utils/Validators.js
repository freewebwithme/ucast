export function modifyErrorMessage(message) {
  let header, errorMessage, final_message;
  [header, errorMessage] = message.split(':');
  final_message = errorMessage.trim();
  return final_message;
}

export function validateEmailFormat(email) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return filter.test(email);
}

export function validateEmailLength(email) {
  return email.length > 10 && email.length < 30;
}
