import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Baburam Adhikari — Data Analyst | Business Intelligence | Machine Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 85% 10%, #3a1417 0%, #0f1a2b 45%, #080f1c 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #ff5a5f 0%, #ed3d43 100%)",
              fontSize: "40px",
              fontWeight: 900,
              fontStyle: "italic",
            }}
          >
            BA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "26px", fontWeight: 700 }}>
              Baburam Adhikari
            </span>
            <span style={{ fontSize: "20px", color: "#94a3b8" }}>
              Edmonton, AB · Canada
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#ff7b80",
            }}
          >
            Data Analyst · BI · Machine Learning
          </span>
          <span style={{ fontSize: "76px", fontWeight: 800, lineHeight: 1.05 }}>
            Turning Data Into
          </span>
          <span style={{ fontSize: "76px", fontWeight: 800, lineHeight: 1.05, color: "#ff5a5f" }}>
            Business Decisions
          </span>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["SQL", "Python", "Power BI", "Tableau", "ETL", "Machine Learning"].map(
            (s) => (
              <span
                key={s}
                style={{
                  display: "flex",
                  fontSize: "22px",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#e2e8f0",
                }}
              >
                {s}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
