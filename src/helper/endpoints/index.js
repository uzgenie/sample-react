import { vendorEndpoints } from "./vendorsEndpoints";
import { productEndpoints } from "./productEndpoints";
import { settingEndPoints } from "./settingsEnpoints";
import { customerEndpoints } from "./customerEndPoints";
import { employeesEndpoints } from "./employeesEndpoints";
import { billEndpoints } from "./billsEndpoints";
import { AnalysisEndPoints } from "./analysis";
export const userSever = "https://testing.egenienext.com:3004";
export const allEndpoints = {
  ...vendorEndpoints,
  ...productEndpoints,
  ...settingEndPoints,
  ...customerEndpoints,
  ...employeesEndpoints,
  ...billEndpoints,
  ...AnalysisEndPoints,
};
