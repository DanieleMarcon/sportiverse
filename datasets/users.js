export const users = {
  id: { type: "UUID", primary: true },
  club_id: { type: "Ref", ref: "clubs", required: true },
  email: { type: "Email", unique: true, required: true },
  first_name: { type: "Text", required: true },
  last_name: { type: "Text", required: true },
  role: {
    type: "Enum",
    values: ["ALLENATORE", "DIRIGENTE", "DS", "PRESIDENTE", "SYSTEM"],
    default: "DIRIGENTE",
  },
  created_at: { type: "DateTime", default: "now" },
  updated_at: { type: "DateTime", default: "now" },
};

export const users_indexes = [
  { fields: ["email"], unique: true },
  { fields: ["club_id"] },
  { fields: ["role"] },
];
