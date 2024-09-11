export {
  getAllAttendances,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "./attendance/attendance.controller.js";
export { registerUser, loginUser } from "./auth/auth.controller.js";
export { getAllUsers, updateUserProfile } from "./user/user.controller.js";
export {
  getAllPayrolls,
  createPayroll,
  getPayrollByUser,
} from "./payroll/payroll.controller.js";
