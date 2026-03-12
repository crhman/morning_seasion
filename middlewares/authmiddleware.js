import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(403).json({ message: "not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next()
  } catch (error) {
    res.status(401).json({ message: " invalid token" });
  }
};


export const adminOnly = async(req,res, next) =>{
    if(req.user.role !== "admin") return res.status(403).json({
        message:"only admin can accses"
    })
    next()
}