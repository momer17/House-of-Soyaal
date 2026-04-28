import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === "video.asset.ready") {
    const asset = body.data;
    const playbackId = asset.playback_ids?.[0]?.id;
    const assetId = asset.id;

    if (playbackId && assetId) {
      const supabase = createAdminClient();
      await supabase
        .from("lessons")
        .update({ mux_playback_id: playbackId })
        .eq("mux_asset_id", assetId);
    }
  }

  return NextResponse.json({ received: true });
}
