export const ACL = {
  // Membership & Registration
  MEMBERSHIP_REGISTER: 'DIRIGENTE',
  MEMBERSHIP_PAYFEE: 'DIRIGENTE',
  
  // Document Management
  DOCUMENT_UPLOAD: 'DIRIGENTE',
  DOCUMENT_DELETE: 'DIRIGENTE',
  DOCUMENT_VIEW: 'ALLENATORE', // Can view documents of own team
  
  // Calendar & Events
  CALENDAR_ADDEVENT: 'DIRIGENTE',
  CALENDAR_SENDNOTIFICATIONS: 'SYSTEM',
  CALENDAR_VIEW: 'ALLENATORE',
  
  // Lineup & Tactics
  LINEUP_SUBMIT: 'ALLENATORE',
  LINEUP_VIEW: 'ALLENATORE',
  
  // Notes & Technical
  ATHLETE_ADDNOTE: 'ALLENATORE',
  ATHLETE_VIEWNOTES: 'ALLENATORE',
  ATHLETE_EDITNOTES: 'ALLENATORE', // Only own notes
  
  // Role Management
  ACL_ASSIGNROLE: 'DS',
  ACL_VIEWROLES: 'DIRIGENTE',
  
  // Financial
  FINANCE_VIEW: 'DIRIGENTE',
  FINANCE_MANAGE: 'DS',
  
  // Reports & Analytics
  REPORTS_VIEW: 'ALLENATORE',
  REPORTS_EXPORT: 'DIRIGENTE',
  
  // System Administration
  SYSTEM_ADMIN: 'PRESIDENTE',
  SYSTEM_BACKUP: 'SYSTEM'
};

// Role hierarchy (ascending order of permissions)
export const ROLE_HIERARCHY = [
  'ALLENATORE',    // Base level - can manage own team
  'DIRIGENTE',     // Can manage club operations
  'DS',            // Can manage staff and advanced operations
  'PRESIDENTE',    // Full club access
  'SYSTEM'         // System-level operations
];

// Helper function to check if user has required role or higher
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole);
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole);
  
  if (userIndex === -1 || requiredIndex === -1) {
    return false;
  }
  
  return userIndex >= requiredIndex;
}

// Permission groups for easier management
export const PERMISSION_GROUPS = {
  ATHLETE_MANAGEMENT: [
    'ATHLETE_ADDNOTE',
    'ATHLETE_VIEWNOTES',
    'DOCUMENT_VIEW'
  ],
  
  CLUB_OPERATIONS: [
    'MEMBERSHIP_REGISTER',
    'DOCUMENT_UPLOAD',
    'CALENDAR_ADDEVENT',
    'FINANCE_VIEW'
  ],
  
  TECHNICAL_STAFF: [
    'LINEUP_SUBMIT',
    'ATHLETE_ADDNOTE',
    'REPORTS_VIEW'
  ],
  
  ADMINISTRATION: [
    'ACL_ASSIGNROLE',
    'FINANCE_MANAGE',
    'SYSTEM_ADMIN'
  ]
};