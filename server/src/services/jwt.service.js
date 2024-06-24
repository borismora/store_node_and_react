import jwt from 'jsonwebtoken';
import moment from 'moment';

let jwtidCounter = 0;
let blacklist = [];

const JwtService = {
  jwtSign: (_payload) => {
    if (process.env.SERVER_JWT !== 'true') {
      throw new Error('[JWT] Fastify JWT flag is not set');
    }

    const payload = { ..._payload };
    jwtidCounter += 1;

    try {
      return jwt.sign(payload, process.env.SERVER_JWT_SECRET, {
        expiresIn: process.env.SERVER_JWT_TIMEOUT,
        jwtid: String(jwtidCounter),
      });
    } catch (error) {
      console.error('[JWT] Error during JWT sign', error);
      throw error;
    }
  },

  jwtGetToken: (request) => {
    if (process.env.SERVER_JWT !== 'true') {
      throw new Error('[JWT] JWT flag is not set');
    }

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('[JWT] JWT token not provided');
    }

    return authorizationHeader.split(' ')[1];
  },

  jwtVerify: (token) => {
    if (process.env.SERVER_JWT !== 'true') {
      throw new Error('[JWT] JWT flag is not set');
    }

    try {
      const decoded = jwt.verify(token, process.env.SERVER_JWT_SECRET);

      // Check if the token is blacklisted
      if (blacklist.some(item => item.jti === decoded.jti && item.iat === decoded.iat && item.exp === decoded.exp)) {
        throw new Error('[JWT] Token is blacklisted');
      }

      console.log('[JWT] Token verified', decoded);
      return decoded;
    } catch (error) {
      console.error('[JWT] Error verifying JWT token', error);
      throw error;
    }
  },

  jwtBlacklistToken: (token) => {
    try {
      // Clean up expired tokens from blacklist
      const currentTime = moment().unix();
      blacklist = blacklist.filter(item => currentTime <= item.exp);

      const decoded = jwt.decode(token);
      if (!decoded || !decoded.jti || !decoded.exp || !decoded.iat) {
        throw new Error('[JWT] Invalid token for blacklisting');
      }

      console.log(`[JWT] Adding JWT ${token} with id ${decoded.jti} to blacklist`);
      blacklist.push({ jti: decoded.jti, exp: decoded.exp, iat: decoded.iat });
    } catch (error) {
      console.error('[JWT] Error blacklisting JWT token', error);
      throw error;
    }
  }
};

export default JwtService;
