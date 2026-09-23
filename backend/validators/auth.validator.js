const requiredFields = (...fields) => (body = {}) => {
  const missing = fields.find((field) => !body[field]);
  return missing ? { error: new Error(`${missing} is required`) } : { value: body };
};
module.exports = { register: requiredFields('name', 'email', 'password'), signin: requiredFields('email', 'password') };
