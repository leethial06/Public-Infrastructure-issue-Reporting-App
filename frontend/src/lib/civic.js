export const CATEGORIES = [
  { id: "Pothole", icon: "🕳️", hint: "Craters, sunken patches" },
  { id: "Street Light", icon: "💡", hint: "Dark or flickering lamps" },
  { id: "Damaged Road", icon: "🛣️", hint: "Cracks, broken surface" },
  { id: "Garbage", icon: "🗑️", hint: "Uncollected waste, dumping" },
  { id: "Drainage", icon: "🌊", hint: "Blocked or open drains" },
  { id: "Water Leakage", icon: "🚰", hint: "Burst pipes, wastage" },
];

export const STATUSES = [
  "Submitted",
  "In Review",
  "In Progress",
  "Resolved",
];

export const PRIORITIES = [
  "Low",
  "Medium",
  "High",
];

export const POINTS_PER_REPORT = 10;
export const POINTS_PER_RESOLVED = 25;

export function pointsFor(complaints) {
  return complaints.reduce(
    (sum, complaint) =>
      sum +
      POINTS_PER_REPORT +
      (complaint.status === "Resolved" ? POINTS_PER_RESOLVED : 0),
    0
  );
}

export function tierFor(points) {
  if (points >= 200) return "Guardian";
  if (points >= 100) return "Champion";
  if (points >= 40) return "Advocate";
  return "Newcomer";
}

export function statusClasses(status) {
  switch (status) {
    case "Resolved":
      return "bg-success/12 text-success border-success/30";

    case "In Progress":
      return "bg-primary/12 text-primary border-primary/30";

    case "In Review":
      return "bg-warning/18 text-warning-foreground border-warning/40";

    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function priorityClasses(priority) {
  switch (priority) {
    case "High":
      return "bg-destructive/12 text-destructive border-destructive/30";

    case "Medium":
      return "bg-warning/18 text-warning-foreground border-warning/40";

    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);

  if (mins < 60) {
    return `${Math.max(mins, 1)}m ago`;
  }

  const hrs = Math.round(mins / 60);

  if (hrs < 24) {
    return `${hrs}h ago`;
  }

  return `${Math.round(hrs / 24)}d ago`;
}