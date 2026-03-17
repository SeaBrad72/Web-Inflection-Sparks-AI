import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

interface OgImageProps {
  title: string;
  subtitle: string;
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateOgImage({ title, subtitle }: OgImageProps) {
  const logoData = await readFile(
    join(process.cwd(), "public/logos/logo-light.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0d1f15 0%, #0A0A0B 40%, #131315 70%, #0f1a12 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar - full width, thick */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(90deg, #E8923F, #38A169, #2F855A, #38A169, #E8923F)",
            display: "flex",
          }}
        />

        {/* Large center glow behind logo */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(56,161,105,0.15) 0%, rgba(232,146,63,0.05) 40%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo - big and centered */}
        <img
          src={logoBase64}
          width={180}
          height={180}
          style={{ marginBottom: "28px" }}
        />

        {/* Title - centered, massive */}
        <div
          style={{
            fontSize: title.length > 30 ? "56px" : "66px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            textAlign: "center",
            display: "flex",
            letterSpacing: "-1px",
            maxWidth: "1000px",
            padding: "0 60px",
          }}
        >
          {title}
        </div>

        {/* Divider line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #38A169, #E8923F)",
            margin: "24px 0",
            borderRadius: "2px",
            display: "flex",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#38A169",
            lineHeight: 1.3,
            textAlign: "center",
            display: "flex",
            fontWeight: 600,
            maxWidth: "800px",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar with URL */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "48px",
            backgroundColor: "rgba(56,161,105,0.1)",
            borderTop: "1px solid rgba(56,161,105,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              color: "#A1A1AA",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            inflectionsparks.ai
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
