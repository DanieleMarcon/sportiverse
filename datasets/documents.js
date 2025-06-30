export const documents = {
  id: { type: "UUID", primary: true },
  athlete_id: { type: "Ref", ref: "athletes", required: true },
  club_id: { type: "Ref", ref: "clubs", required: true },
  type: {
    type: "Enum",
    values: [
      "cartellino",
      "visita_medica",
      "nulla_osta",
      "certificato_medico",
      "assicurazione",
    ],
    required: true,
  },
  file_url: { type: "Text", required: true },
  file_name: { type: "Text", required: true },
  file_size: { type: "Number", required: true },
  expires_at: { type: "Date", nullable: true },
  uploaded_by: { type: "Ref", ref: "users", required: true },
  created_at: { type: "DateTime", default: "now" },
  updated_at: { type: "DateTime", default: "now" },
};

export const documents_indexes = [
  { fields: ["athlete_id"] },
  { fields: ["club_id"] },
  { fields: ["type"] },
  { fields: ["expires_at"] },
];
