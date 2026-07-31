import { Request, Response, NextFunction } from "express";
import { reportRangeSchema } from "./reports.dto";
import * as reportsService from "./reports.service";
import { streamRevenuePdf, streamOccupancyPdf } from "../../utils/pdf-generator";
import { streamRevenueExcel, streamOccupancyExcel } from "../../utils/excel-generator";

export async function revenueReport(req: Request, res: Response, next: NextFunction) {
  try {
    const input = reportRangeSchema.parse(req.query);
    const data = await reportsService.getRevenueReportData(input);

    if (input.format === "excel") {
      await streamRevenueExcel(res, data);
    } else {
      streamRevenuePdf(res, data);
    }
  } catch (error) {
    next(error);
  }
}

export async function occupancyReport(req: Request, res: Response, next: NextFunction) {
  try {
    const input = reportRangeSchema.parse(req.query);
    const data = await reportsService.getOccupancyReportData(input);

    if (input.format === "excel") {
      await streamOccupancyExcel(res, data);
    } else {
      streamOccupancyPdf(res, data);
    }
  } catch (error) {
    next(error);
  }
}