import JwtService from "../services/jwt.service";
import passport from "passport";
import * as Yup from "yup";
import { ValidationError } from "../utils/ApiError";
import User from "../models/user";

const loginController = {
  signUp: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { name, email, password } = req.body;

      const user = await User.create({
        name,
        email,
        password,
      });

      const token = JwtService.jwtSign(user.id);

      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      passport.authenticate("local", { session: false }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ error: "Invalid email or password." });
        }

        req.login(user, { session: false }, (err) => {
          if (err) {
            return next(err);
          }

          const token = JwtService.jwtSign({ userId: user.id });

          return res.status(200).json({ user, token });
        });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      JwtService.jwtBlacklistToken(JwtService.jwtGetToken(req));

      res.status(200).json({ msg: "Authorized" });
    } catch (error) {
      next(error);
    }
  },

  profile: async (req, res) => {
    res.json(req.user);
  },
};

export default loginController;
