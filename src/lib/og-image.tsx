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
          flexDirection: "row",
          backgroundColor: "#0A0A0B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Strong teal accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #1a6b3c, #38A169, #E8923F, #38A169, #1a6b3c)",
            display: "flex",
          }}
        />

        {/* Background glow - teal */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-50px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,161,105,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Background glow - orange */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,146,63,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 60px 60px 70px",
            flex: 1,
            maxWidth: "820px",
          }}
        >
          {/* Badge */}
          {badge && (
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  backgroundColor: "rgba(56,161,105,0.25)",
                  border: "1px solid rgba(56,161,105,0.5)",
                  padding: "6px 16px",
                  borderRadius: "4px",
                }}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 35 ? "48px" : "56px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "24px",
              display: "flex",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#D4D4D8",
              lineHeight: 1.45,
              display: "flex",
              maxWidth: "680px",
            }}
          >
            {description}
          </div>

          {/* Bottom branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              paddingTop: "30px",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "20px",
                backgroundColor: "#38A169",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                color: "#A1A1AA",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              inflectionsparks.ai
            </span>
          </div>
        </div>

        {/* Right side - Large logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "380px",
            paddingRight: "40px",
          }}
        >
          <img
            src={logoBase64}
            width={260}
            height={260}
            style={{
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
