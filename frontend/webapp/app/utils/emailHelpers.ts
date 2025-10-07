/**
 * Parsed sender information extracted from email 'from' field
 */
export interface ParsedSender {
  /** The sender's display name */
  name: string;
  /** The sender's email address */
  email: string;
  /** Two-letter initials derived from the sender's name */
  initials: string;
}

/**
 * Helper function to extract name, email, and initials from sender string
 * 
 * Handles multiple email formats:
 * - "John Doe <john.doe@example.com>" → { name: "John Doe", email: "john.doe@example.com", initials: "JD" }
 * - "john.doe@example.com" → { name: "john.doe", email: "john.doe@example.com", initials: "J" }
 * - Empty/invalid → { name: "Unknown", email: "", initials: "U" }
 * 
 * @param from - The raw sender string from email headers
 * @returns ParsedSender object with structured sender information
 */
export const parseSender = (from: string): ParsedSender => {
  if (!from) return { name: 'Unknown', email: '', initials: 'U' };
  
  // Match pattern: "Name <email@domain.com>" or just "email@domain.com"
  const match = from.match(/^(.*?)\s*<(.+)>$/) || from.match(/^(.+)$/);
  
  if (match) {
    const name = match[1]?.trim() || '';
    const email = match[2]?.trim() || match[1]?.trim() || '';
    
    // Generate initials from name (first letter of each word, max 2 letters)
    const initials = name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0].toUpperCase())
      .slice(0, 2) // Take first 2 initials
      .join('');
    
    return {
      name: name || email.split('@')[0] || 'Unknown',
      email,
      initials: initials || (email[0]?.toUpperCase() || 'U')
    };
  }
  
  return { name: 'Unknown', email: '', initials: 'U' };
};