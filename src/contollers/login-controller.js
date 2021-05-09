import {signIn} from '../services/login-service'

export const login = (req, res) => {
  return signIn(req, res);
}
