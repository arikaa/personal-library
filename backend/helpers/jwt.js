
import expressJwt from 'express-jwt';
import { getSecrets } from '../secrets';
import userService from '../users/user.service';

// jwt ensures the user login is valid unless a public route is specified
export default function jwt() {
  const secret = getSecrets('secret');
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't need authentication
      '/users/authenticate',
      '/users/register'
    ]
  });
}

// isRevoked revokes the token if the user no longer exists
async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  if (!user){
    return done(null, true);
  }
  done();
}