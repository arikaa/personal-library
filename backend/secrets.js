
// The local identifiers for the database URI and the jwt secret
const secrets = {
  dbUri: process.env.DB_URI_LOCAL,
  secret: process.env.JWT_SECRET,
};

export const getSecrets = key => secrets[key];
