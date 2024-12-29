export const hosturl = "http://localhost:3300";
export const endpoints = {
  login: "/api/auth/login",
  //ADMIN ROUTES
  getlaptops: "/api/laptops/getall",
  getlaptop: "/api/laptops/get/",
  updatelaptop: "/api/laptops/update/",
  deletelaptop: "/api/laptops/delete/",
  getunassignedlaptops: "/api/laptops/getunassigned",
  addnewlaptop: "/api/laptops/addnew",
  assignLaptop: "/api/admin/assign",
  unassignLaptop: "/api/admin/unassign/",
  getissues: "/api/admin/issues",
  getrequests: "/api/admin/requests",
  requestAction: "/api/admin/request-action/",
  issueUpdate: "/api/admin/issue/",
  getLogs: "/api/admin/getlogs",
  getcounts: "/api/admin/counts",
  getemployees: "/api/employee/getall",
  getemployee: "/api/employee/get/",
  //EMPLOYEE ROUTES
  getRequestsOfEmployee: "/api/employee-action/all-requests",
  sendNewRequest: "/api/employee-action/new-request",
  getlaptopAssinged: "/api/employee-action/assigned",
  reportIssue: "/api/employee-action/report-issue",
  returnLaptop: "/api/employee-action/return",
  getMyReports: "/api/employee-action/reports",
  getEmployeeAssigned: "/api/employee-action/history",
};
