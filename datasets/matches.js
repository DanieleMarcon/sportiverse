export const matches = {
  id: { type: "UUID", primary: true },
  home_team_id: { type: "Ref", ref: "teams", required: true },
  away_team_id: { type: "Ref", ref: "teams", required: true },
  matchday: { type: "Number", required: true },
  competition: { type: "Text", required: true },
  date: { type: "DateTime", required: true },
  status: {
    type: "Enum",
    values: ["scheduled", "played", "cancelled"],
    default: "scheduled",
  },
  created_at: { type: "DateTime", default: "now" },
  updated_at: { type: "DateTime", default: "now" },
};

export const matches_indexes = [
  { fields: ["home_team_id"] },
  { fields: ["away_team_id"] },
  { fields: ["date"] },
  { fields: ["status"] },
];
