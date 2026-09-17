
import Ping from "./Ping";
import { sanityFetch } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import ViewTracker from "./ViewTracker";

const View = async ({ id }: { id: string }) => {
  const result = await sanityFetch({
    query: STARTUP_VIEWS_QUERY,
    params: { id },
    revalidate: 0,
  });

  const totalViews = result?.views ?? 0;

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">
          {totalViews} {totalViews === 1 ? "View" : "Views"}
        </span>
      </p>

      <ViewTracker id={id} />
    </div>
  );
};

export default View;