// Type declaration for the @mux/mux-player-react web component custom element.
// The <mux-player> custom element is registered by the @mux/mux-player script.

import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "mux-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "playback-id"?: string;
          "start-time"?: number;
          style?: React.CSSProperties;
          onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
          onEnded?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
        },
        HTMLElement
      >;
    }
  }
}
