import { ViewTransition } from "react";

// A template remounts on every navigation, so each page gets a fresh
// <ViewTransition>: the old page plays "page-exit" and the new one "page-enter"
// (animations in globals.css). Initial loads and other updates don't animate.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
