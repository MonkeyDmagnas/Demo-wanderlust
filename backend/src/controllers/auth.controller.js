import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating token", error);
  }
};

const signUpWithEmail = async (req, res) => {
  try {
    const { email, password, fullName, userName } = req.body;
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(409).json({ message: "User Already exists" });
    }

    const user = await User.create({
      email,
      fullName,
      userName,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password -refresh_token");

    res.status(201).json({
      message: "User registerd successful",
      data: createdUser,
    });
  } catch (error) {
    console.log("Eror in register", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Successfully logged in",
        data: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({ message: error.message });
  }
};

const userLogout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refresh_token: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User LoggedOut Successfully",
    });
};

const isLoggedIn = async (req, res) => {
  try {
    const accessToken = req.cookies?.accessToken;
    console.log("access::", accessToken);
    const refreshToken = req.cookies?.refreshToken;
    console.log("refresh", refreshToken);
    const { _id } = req.params;

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
          message: "Valid token",
          accessToken,
        });
      } catch (error) {
        console.log("error  from accessToken::", error);
      }
    }

    if (refreshToken) {
      try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = user.generateAccessToken();
        return res
          .status(200)
          .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
          })
          .json({
            message: "Valid token",
            accessToken: newAccessToken,
          });
      } catch (error) {
        console.log("error from refresh token::", error);
      }
    }

    // If no cookies, check the user's refresh token in DB
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    }

    const userRefreshToken = user.refreshToken;
    if (!userRefreshToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const decoded = jwt.verify(userRefreshToken, process.env.JWT_SECRET);
      const newAccessToken = user.generateAccessToken();
      const newRefreshToken = user.generateRefreshToken();

      user.refreshToken = newRefreshToken;
      await user.save({ validateBeforeSave: false });

      return res
        .status(200)
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: false,
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          message: "Valid token",
          accessToken: newAccessToken,
        });
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
        error: error.message,
      });
    }
  } catch (error) {
    console.log("Error in isLoggedIn", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export { signUpWithEmail, userLogin, userLogout, isLoggedIn };
