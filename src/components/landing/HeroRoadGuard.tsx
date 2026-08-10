"use client";

import { Component, type ReactNode } from "react";

type HeroRoadGuardProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type HeroRoadGuardState = {
  failed: boolean;
};

/** Catch WebGL init failures (common under Yandex power-saving / software GL). */
export class HeroRoadGuard extends Component<
  HeroRoadGuardProps,
  HeroRoadGuardState
> {
  state: HeroRoadGuardState = { failed: false };

  static getDerivedStateFromError(): HeroRoadGuardState {
    return { failed: true };
  }

  componentDidCatch(): void {
    // Keep static road; avoid crashing the hero tree.
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
