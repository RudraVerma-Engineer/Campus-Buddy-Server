import { Branch } from "../model/branch.model";
import jwt from "jsonwebtoken";

export async function createBranch(req, res, next) {
  try {
    const departmentToken = req.cookie.department;
    const { nameBranch } = req.body;
    const jwtDepartmentId = jwt.verify(departmentToken, process.env.JWT_SECRET);
    if (!jwtDepartmentId)
      throw new AppError(400, "Department Id verification Fails");
    const createdBranch = await Branch.create({
      nameBranch: nameBranch,
      department: jwtDepartmentId.id,
    });
    if (!createdBranch)
      throw new AppError(500, "Internal Error in creating Branch ");
    return res.status(201).json({
      success: true,
      message: "Successfully Created the Branch",
      branch: createdBranch,
    });
  } catch (err) {
    next(err);
  }
}
