/**
 * Documentation-only content describing planned future infrastructure.
 * None of this is implemented in this repository — it exists so the
 * roadmap is visible and the site's data model can accommodate it
 * later without a rebuild.
 */
export const signalInfrastructure = {
  headline: "Future Signal Infrastructure",
  description:
    "Code Phantom EA is not connected to a live signal backend today. The website is architected so a future signal pipeline can plug in without a rebuild.",
  pipeline: [
    "Code Phantom EA",
    "Phantom Signal API",
    "Validation",
    "Signal Database",
    "Website Dashboard",
    "Messaging Integrations",
    "Analytics",
  ],
};

export const futurePhantomTradersServices = {
  headline: "Future Phantom Traders Services",
  description:
    "These are potential future directions for Phantom Traders, not current offerings. Several may require regulatory approval before they can launch.",
  possibilities: [
    "Trading signals",
    "Copy trading",
    "Broker / IB relationships",
    "Subscriber discounts & promotional pricing",
    "Automated execution services",
    "Performance-based services",
    "Verified trading analytics",
  ],
  currentlyOffered: [] as string[],
};

export const adminRoadmap = {
  headline: "CodePhantom Admin (Planned)",
  description:
    "V1 of this website is powered by structured content and configuration files rather than a full CMS. This keeps the site fast and simple while leaving a clear migration path: each data model below (projects, articles, promotions, reviews, company information, Phantom Traders updates) is already shaped so it can move into a database-backed CodePhantom Admin panel later with minimal rework.",
  manages: [
    "Projects",
    "Articles / Research",
    "Promotions",
    "Reviews",
    "Company information",
    "Phantom Traders updates",
  ],
};
