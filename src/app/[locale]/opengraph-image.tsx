import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Codegenic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isKo = locale === "ko";

  return new ImageResponse(
    <div
      style={{
        background: "#03050f",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* 배지 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(124,58,237,0.15)",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: "999px",
          padding: "8px 20px",
          marginBottom: "32px",
          color: "#a855f7",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        {isKo ? "AI 네이티브 게임사" : "AI-Native Game Studio"}
      </div>

      {/* 로고 */}
      <div
        style={{
          fontSize: "80px",
          fontWeight: 800,
          color: "#f0f4ff",
          letterSpacing: "-2px",
          marginBottom: "16px",
          background: "linear-gradient(135deg, #a855f7, #22d3ee)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Codegenic
      </div>

      {/* 설명 */}
      <div
        style={{
          fontSize: "24px",
          color: "#94a3b8",
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: 1.5,
        }}
      >
        {isKo
          ? "AI로 게임을 만드는 회사 · 우주 댕댕 수호대 2026년 11월 출시"
          : "A game company powered by AI · Cosmic Daeng Guardians coming November 2026"}
      </div>
    </div>,
    { ...size },
  );
}
