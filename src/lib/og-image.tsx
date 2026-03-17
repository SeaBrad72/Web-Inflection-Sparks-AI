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
          backgroundColor: "#0A0A0B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background:
              "linear-gradient(90deg, #1a6b3c, #38A169, #E8923F, #38A169, #1a6b3c)",
            display: "flex",
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "50px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,161,105,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo - large, left side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "380px",
            flexShrink: 0,
            paddingLeft: "60px",
          }}
        >
          <img src={logoBase64} width={300} height={300} />
        </div>

        {/* Text content - right side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingRight: "70px",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: title.length > 30 ? "58px" : "68px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "20px",
              display: "flex",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </div>

          {/* Subtitle - short and punchy */}
          <div
            style={{
              fontSize: "30px",
              color: "#38A169",
              lineHeight: 1.3,
              display: "flex",
              fontWeight: 600,
            }}
          >
            {subtitle}
          </div>

          {/* URL branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "32px",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "3px",
                backgroundColor: "#E8923F",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                color: "#71717A",
                fontWeight: 600,
              }}
            >
              inflectionsparks.ai
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
