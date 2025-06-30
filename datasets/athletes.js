export const athletes = {
  id: { type: "UUID", primary: true },
  club_id: { type: "Ref", ref: "clubs", required: true },
  team_id: { type: "Ref", ref: "teams", required: true },
  first_name: { type: "Text", required: true },
  last_name: { type: "Text", required: true },
  birth_date: { type: "Date", required: true },
  position: {
    type: "Enum",
    values: ["GK", "CB", "LB", "RB", "CM", "CF", "ST", "LW", "RW"],
    required: true,
  },
  status: {
    type: "Enum",
    values: ["active", "injured", "suspended"],
    default: "active",
  },
  is_registered: { type: "Boolean", default: true },
  created_at: { type: "DateTime", default: "now" },
  updated_at: { type: "DateTime", default: "now" },
};

export const athletes_indexes = [
  { fields: ["club_id"] },
  { fields: ["team_id"] },
  { fields: ["status"] },
];
