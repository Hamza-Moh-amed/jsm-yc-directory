"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { incrementStartupViews } from "@/lib/action";

const ViewTracker = ({ id }: { id: string }) => {
  const router = useRouter();
  const hasTracked = useRef(false);
  const isTracking = useRef(false);

  useEffect(() => {
    if (hasTracked.current || isTracking.current) {
      return;
    }

    isTracking.current = true;

    const trackView = async () => {
      try {
        await incrementStartupViews(id);

        hasTracked.current = true;

        router.refresh();
      } catch (error) {
        console.error("View tracking error:", error);
        isTracking.current = false;
      }
    };

    void trackView();
  }, [id, router]);

  return null;
};

export default ViewTracker;