import React from "react";
import { getNowPlaying } from "@/lib/spotify";
import { SpotifyCardClient, SpotifyData } from "./spotify-card-client";

async function fetchInitialSpotifyData(): Promise<SpotifyData> {
  try {
    const res = await getNowPlaying();
    
    if (res.status === 204 || res.status > 400) {
      return { isPlaying: false };
    }
    
    const song = await res.json();
    if (!song.item) {
      return { isPlaying: false };
    }

    return {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
      progressMs: song.progress_ms,
      durationMs: song.item.duration_ms,
    };
  } catch (error) {
    return { isPlaying: false };
  }
}

export async function SpotifyCard() {
  const initialData = await fetchInitialSpotifyData();

  return <SpotifyCardClient initialData={initialData} />;
}