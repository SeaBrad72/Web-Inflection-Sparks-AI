import React from "react";
import { ImageResponse } from "next/og";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function loadImage(filename: string) {
  const data = await readFile(join(process.cwd(), `public/logos/${filename}`));
  return `data:image/png;base64,${data.toString("base64")}`;
}

function BannerContent({
  bannerBase64,
  logoBase64,
  width,
  height,
  variant,
}: {
  bannerBase64: string;
  logoBase64: string;
  width: number;
  height: number;
  variant: "linkedin-personal" | "facebook" | "google";
}) {
  const isGoogle = variant === "google";
  const isTall = height > 300;

  if (isGoogle) {
    // Square format — logo centered with brand text below
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #0d1f15 0%, #0A0A0B 40%, #131315 70%, #0f1a12 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background:
              "linear-gradient(90deg, #E8923F, #38A169, #2F855A, #38A169, #E8923F)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,161,105,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <img src={logoBase64} width={320} height={320} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "24px",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            InflectionSparks.ai
          </span>
          <span
            style={{
              fontSize: "22px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            FRACTIONAL CTO & AI TRANSFORMATION
          </span>
        </div>
      </div>
    );
  }

  // Wide banner format — LinkedIn personal & Facebook
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0d1f15 0%, #0f1510 25%, #0A0A0B 50%, #12100f 75%, #0d1f15 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background:
            "linear-gradient(90deg, #E8923F, #38A169, #2F855A, #38A169, #E8923F)",
          display: "flex",
        }}
      />

      {/* Teal glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "150px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,161,105,0.1) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "250px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,146,63,0.06) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Logo left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isTall ? "360px" : "300px",
          flexShrink: 0,
          paddingLeft: isTall ? "60px" : "40px",
        }}
      >
        <img
          src={logoBase64}
          width={isTall ? 260 : 200}
          height={isTall ? 260 : 200}
        />
      </div>

      {/* Vertical divider */}
      <div
        style={{
          width: "3px",
          height: isTall ? "160px" : "120px",
          background:
            "linear-gradient(180deg, transparent, #38A169, #E8923F, transparent)",
          borderRadius: "2px",
          display: "flex",
          flexShrink: 0,
        }}
      />

      {/* Text right */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: isTall ? "0 60px 0 40px" : "0 40px 0 30px",
        }}
      >
        <div
          style={{
            fontSize: isTall ? "54px" : "40px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-1px",
            display: "flex",
            marginBottom: isTall ? "16px" : "10px",
          }}
        >
          Fractional CTO & AI Transformation
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: isTall ? "20px" : "16px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            LEAD
          </span>
          <span
            style={{
              fontSize: isTall ? "20px" : "16px",
              color: "#52525B",
            }}
          >
            |
          </span>
          <span
            style={{
              fontSize: isTall ? "20px" : "16px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            BUILD
          </span>
          <span
            style={{
              fontSize: isTall ? "20px" : "16px",
              color: "#52525B",
            }}
          >
            |
          </span>
          <span
            style={{
              fontSize: isTall ? "20px" : "16px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            TRANSFORM
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: isTall ? "20px" : "12px",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "3px",
              backgroundColor: "#E8923F",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: isTall ? "18px" : "14px",
              color: "#71717A",
              fontWeight: 600,
            }}
          >
            inflectionsparks.ai
          </span>
        </div>
      </div>
    </div>
  );
}

const banners = [
  {
    name: "linkedin-personal-banner",
    width: 1584,
    height: 396,
    variant: "linkedin-personal" as const,
  },
  {
    name: "facebook-cover",
    width: 820,
    height: 312,
    variant: "facebook" as const,
  },
  {
    name: "google-business-profile",
    width: 720,
    height: 720,
    variant: "google" as const,
  },
];

async function generate() {
  const bannerBase64 = await loadImage("banner-light.png");
  const logoBase64 = await loadImage("logo-light.png");

  for (const banner of banners) {
    const response = new ImageResponse(
      (
        <BannerContent
          bannerBase64={bannerBase64}
          logoBase64={logoBase64}
          width={banner.width}
          height={banner.height}
          variant={banner.variant}
        />
      ),
      { width: banner.width, height: banner.height }
    );

    const buffer = Buffer.from(await response.arrayBuffer());
    const outPath = join(process.cwd(), `assets/${banner.name}.png`);
    await writeFile(outPath, buffer);
    console.log(`${banner.name} (${banner.width}x${banner.height}) → ${outPath}`);
  }
}

generate().catch(console.error);
