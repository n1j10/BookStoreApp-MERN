const ROLES = Object.freeze({ USER: 'user', ADMIN: 'admin' });
const HTTP_STATUS = Object.freeze({ OK: 200, CREATED: 201, BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404 });
module.exports = { ROLES, HTTP_STATUS };
