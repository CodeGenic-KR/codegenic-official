import type { ReactNode } from "react";

// [locale]/layout.tsx가 실제 root layout 역할을 담당한다.
// Next.js App Router 요구사항상 이 파일은 존재해야 한다.
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
