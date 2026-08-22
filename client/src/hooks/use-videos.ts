"use client";

import { getVideos } from "@/lib/api/videos";
import { useQuery } from "@tanstack/react-query";


export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
}