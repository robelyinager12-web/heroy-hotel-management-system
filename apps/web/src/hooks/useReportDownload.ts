import { useState, useCallback } from "react";
import { downloadReport } from "@/lib/download";

type ReportType = "revenue" | "occupancy";
type ReportFormat = "pdf" | "excel";

export function useReportDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(
    async (type: ReportType, format: ReportFormat, from: string, to: string) => {
      setIsDownloading(true);
      setError(null);

      try {
        const extension = format === "pdf" ? "pdf" : "xlsx";
        const filename = `heroy-${type}-report.${extension}`;

        await downloadReport(
          `/reports/${type}`,
          {
            from: new Date(from).toISOString(),
            to: new Date(to).toISOString(),
            format,
          },
          filename
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Download failed");
      } finally {
        setIsDownloading(false);
      }
    },
    []
  );

  return { download, isDownloading, error };
}