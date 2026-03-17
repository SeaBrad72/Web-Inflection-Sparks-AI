import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

interface OgImageProps {
  title: string;
  description: string;
  badge?: string;
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateOgImage({
  title,
  description,
  badge,
}: OgImageProps) {
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
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#0A0A0B",
          position: "relative",
        }}
      >
        {/* Teal accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #2F855A, #38A169, #2F855A)",
            display: "flex",
          }}
        />

        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(47,133,90,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", marginBottom: "40px" }}>
          <img src={logoBase64} width={64} height={64} />
        </div>

        {/* Badge */}
        {badge && (
          <div
            style={{
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#38A169",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? "44px" : "52px",
            fontWeight: 700,
            color: "#FAFAFA",
            lineHeight: 1.15,
            marginBottom: "20px",
            display: "flex",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#A1A1AA",
            lineHeight: 1.5,
            display: "flex",
            maxWidth: "800px",
          }}
        >
          {description}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#52525B",
              fontWeight: 500,
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
