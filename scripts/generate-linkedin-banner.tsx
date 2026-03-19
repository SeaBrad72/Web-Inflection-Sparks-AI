import React from "react";
import { ImageResponse } from "next/og";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function generateBanner() {
  const bannerData = await readFile(
    join(process.cwd(), "public/logos/banner-light.png")
  );
  const bannerBase64 = `data:image/png;base64,${bannerData.toString("base64")}`;

  const response = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0d1f15 0%, #0f1510 25%, #0A0A0B 50%, #12100f 75%, #0d1f15 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle teal glow left */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,161,105,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Subtle orange glow right */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "200px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,146,63,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #E8923F, #38A169, #2F855A, #38A169, #E8923F)",
            display: "flex",
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Banner logo */}
          <img src={bannerBase64} height={90} />
        </div>

        {/* Tagline below */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            FRACTIONAL CTO
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#52525B",
              fontWeight: 400,
            }}
          >
            |
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            AI TRANSFORMATION
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#52525B",
              fontWeight: 400,
            }}
          >
            |
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#38A169",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            ENGINEERING LEADERSHIP
          </span>
        </div>
      </div>
    ),
    { width: 1128, height: 191 }
  );

  const buffer = Buffer.from(await response.arrayBuffer());
  const outPath = join(process.cwd(), "assets/linkedin-company-banner.png");
  await writeFile(outPath, buffer);
  console.log(`Banner saved to ${outPath}`);
}

generateBanner().catch(console.error);
