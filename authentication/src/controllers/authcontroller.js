import {registerUser,loginUser,verifyToken} from '../services/authservices.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await registerUser( email, password);
        return res.status(200).json({
          success: true,
          message: "User successfully registered",
          data: result,
          err: {},
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Something went wrong in register fn in auth-controller",
          data: {},
          success: false,
          err: error,
        });
      }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {token,user} = await loginUser(email, password);
       
        return res.status(200).json({
          success: true,
          message: "Successfully logged in",
          data: {token,user},
          err: {},
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Something went wrong in login fn in auth-controller",
          data: {},
          success: false,
          err: error,
        });
      }
};

export const protectedRoute = async (req, res) => {
  try {
    res.json({ message: 'Protected route accessed.', user: req.user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

