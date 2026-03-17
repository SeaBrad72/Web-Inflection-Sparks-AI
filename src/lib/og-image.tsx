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
          flexDirection: "row",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0d1f15 0%, #0f1510 30%, #0A0A0B 60%, #12100f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm glow behind logo */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "600px",
            height: "630px",
            background:
              "radial-gradient(circle at 250px 315px, rgba(56,161,105,0.18) 0%, rgba(232,146,63,0.08) 30%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* Logo - MASSIVE, left side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "480px",
            flexShrink: 0,
          }}
        >
          <img src={logoBase64} width={360} height={360} />
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: "4px",
            height: "200px",
            background:
              "linear-gradient(180deg, transparent, #38A169, #E8923F, transparent)",
            borderRadius: "2px",
            display: "flex",
            flexShrink: 0,
          }}
        />

        {/* Text - right side, just the title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 60px 0 50px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 25 ? "60px" : "72px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.05,
              display: "flex",
              letterSpacing: "-2px",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
