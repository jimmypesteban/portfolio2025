// Custom title overrides keyed by "folder/filename" (no /images/ prefix, no extension)
const OVERRIDES = {
  "trials/FirstGlance": "First Glance",
  "trials/Major Pain Points": "Major Pain Points",
  "trials/asIWantToSoThat": "As I Want To Do That...",
  "trials/Trials_DesignSyetem": "Trials Design System",
  "trials/ShowHideColumns_Trials": "Show/Hide Columns Trials",
  "trials/NewComponent": "Form Builder: Creating a New Component",
  "trials/NewForm": "Form Builder: Using a Component",
  "trials/Templates - Grid View": "Templates Grid View",
  "trials/Participants_AuditLog_LM": "Participants Audit Log (Light Mode)",
  "trials/Detailed Page - Audit Logs - Style 1": "Detailed Page Audit Logs",
  "trials/Dashboard - LM": "Dashboard (Light Mode)",
  "trials/Dashboard - DM": "Dashboard (Dark Mode)",
  "trials/Visits - Week - LM": "Calendar (Light Mode)",
  "trials/Visits - Week - DM": "Calendar (Dark Mode)",
  "trials/Messenger 1 - LM": "Message (Light Mode)",
  "trials/Messenger 1 - DM": "Message (Dark Mode)",
  "trials/Messenger 2 - LM": "Message: Group Details (Light Mode)",
  "trials/Messenger 2 - DM": "Message: Group Details (Dark Mode)",

  // Plangora
  "plangora/plangora1": "Plangora Channel",
  "plangora/plangora2": "Graphics",
  "plangora/plangoraBrandGuidelines": "Plangora Brand Guidelines",
  "plangora/fhwf2": "FHWF Channel",
  "plangora/fhwfquestions": "FHWF Questions for Guest Speakers",
  "plangora/rustaceanstation": "Rustacean Station",
  "plangora/rust_guest_question": "Rustacean Station Questions for Guest Speakers",
  "plangora/rwfBanner": "RWF Course Banner",
  "plangora/rustWithFlutterCourseCheatsheet": "RWF Course Cheatsheet",
  "plangora/rustWithFlutterCourseSnippet": "RWF Course Snippet",
  "plangora/teachmecodeIG": "Teachmecode IG",
  "plangora/thepetalstackCover": "thepetalstack Site",

  // Transigo
  "transigo/transigoForm_old": "Form (Old)",
  "transigo/transigoForm": "Form (New)",
  "transigo/Exporters_old": "Exporters (Old)",
  "transigo/Exporters": "Exporters (New)",
  "transigo/Quotas_old": "Quotas (Old)",
  "transigo/Quotas": "Quotas (New)",

  // Datago Technology Official Site
  "datagosite/datagoSiteComponents": "Components",
  "datagosite/datagoSiteIconsLogo": "Icons & Logo",
  "datagosite/datagoSiteColors": "Colors",
  "datagosite/datagoSiteTypography2": "Typography",
  "datagosite/datagoSite_Home_Old": "Homepage (Old)",
  "datagosite/datagoSite_Home_New": "Homepage (New)",
  "datagosite/datagoSite_Services_Old": "Services Page (Old)",
  "datagosite/datagoSite_Services_New": "Services Page (New)",
  "datagosite/datagoSite_Database_Old": "Database Page (Old)",
  "datagosite/datagoSite_Database_New": "Database Page (New)",
  "datagosite/datagoSite_AboutUs_Old": "About Us Page (Old)",
  "datagosite/datagoSite_AboutUs_New": "About Us Page (New)",
  "datagosite/datagoSite_ContactUs_Old": "Contact Us Page (Old)",
  "datagosite/datagoSite_ContactUs_New": "Contact Us Page (New)",
  "datagosite/datagoSite_Terms_Old": "Terms Page (Old)",
  "datagosite/datagoSite_Terms_New": "Terms Page (New)",

  // Melon
  "melon/melonExploration": "Paper Exploration",
  "melon/melonExploration2": "Digital Exploration",
  "melon/melonLogoBreakdown": "Melon Logo Breakdown",
  "melon/melonLogo": "Melon Logo",
  "melon/melonEmoji3": "Melon Emojis",
  "melon/melonEmoji1": "Melon Emojis Colorful Alternative",
  "melon/melonStyleguide": "Melon Styleguide",
  "melon/melonPink": "Melon Pink Site Theme",
  "melon/melonOrange": "Melon Orange Site Theme",
  "melon/melonGreen": "Melon Green Site Theme",
  "melon/melonBrown": "Melon Brown Site Theme",

  // Cynderian
  "cynderian/cynderiansitemap": "Sitemap",
  "cynderian/cynderianwireframes1": "Wireframes 1",
  "cynderian/cynderianwireframes2": "Wireframes 2",
  "cynderian/cynderianfullold": "Homepage (Old)",
  "cynderian/cynderianfull": "Homepage (New)",
  "cynderian/cynderianconnectoldnew": "Connect Page (Old & New)",
  "cynderian/cynderianservices": "Services Page (New)",
  "cynderian/cynderianstartupsupport": "Support Page (New)",
  "cynderian/cynderianteam": "Team Page (New)",
  "cynderian/cynderianexplore": "Explore Page (New)",
  "cynderian/cynderiandesignoldnew": "Design Page (Old & New)",
  "cynderian/cynderianpopupmodal": "Popup Modal (New)",

  // DatagoTech (App)
  "datagotech/search_result_v3": "Search Result V3 A",
  "datagotech/search_result_v3-2": "Search Result V3 B",
  "datagotech/datagoTechDesignSystem": "Design System",
  "datagotech/redgreenswitcher": "Red/Green Switcher",
  "datagotech/searchedResult": "Searched Result (April)",
  "datagotech/searchedResult_new": "Searched Result (May)",
  "datagotech/filter": "Filter (April)",
  "datagotech/filter_new": "Filter (May)",

  // Daily UI
  "dailyui/DailyUI013home": "DailyUI013",

  // GGEZ
  "ggez/persona3": "Persona (Paul)",
  "ggez/persona4": "Persona (Anthony)",
  "ggez/homesketch": "Home Sketch (Crazy 8)",
  "ggez/paperwireframe": "Paper Wireframe",
  "ggez/homewireframe": "Digital Homepage Wireframe",
  "ggez/ggezprototype": "Prototype",
  "ggez/siteranking": "Site Ranking",
  "ggez/sitemapforspider": "Sitemap for Spider",
  "ggez/googlefetch": "Google Fetch",
  "ggez/keywordanalysis": "Keyword Analysis",
  "ggez/thinkwithgoogle": "Think with Google",
  "ggez/thinkwithgoogle2": "Think with Google 2",
  "ggez/wavetool": "WAVE Tool",
  "ggez/powermapper": "PowerMapper",
  "ggez/colorblindtest": "Color Blind Test",
  "ggez/ggezfull": "GGEZ Final Homepage",
};

export function getTitleFromUrl(url) {
  const decoded = decodeURIComponent(url);
  const key = decoded.replace(/^\//, "").replace(/\.[^.]+$/, "");
  if (OVERRIDES[key]) return OVERRIDES[key];
  const filename = key.split("/").pop();
  return filename
    .replace(/[-_]+/g, " ")
    .replace(/\bLM\b/g, "(Light Mode)")
    .replace(/\bDM\b/g, "(Dark Mode)")
    .trim();
}

export function getImageTitle(el) {
  if (el.alt) return el.alt;

  const decoded = decodeURIComponent(el.src);
  // Extract "folder/filename" from "/images/folder/filename.ext"
  const key = decoded.replace(/^.*\/images\//, "").replace(/\.[^.]+$/, "");

  if (OVERRIDES[key]) return OVERRIDES[key];

  // General cleanup: decode, strip path, remove extension, expand LM/DM
  const filename = key.split("/").pop();
  return filename
    .replace(/[-_]+/g, " ")
    .replace(/\bLM\b/g, "(Light Mode)")
    .replace(/\bDM\b/g, "(Dark Mode)")
    .trim();
}
