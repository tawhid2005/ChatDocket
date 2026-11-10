import { ChatMetadata, BrandingConfig } from '@/types/chat';

export function downloadForensicCertificate(
  metadata: ChatMetadata,
  branding: BrandingConfig
) {
  const dateNow = new Date().toISOString();
  const certContent = `================================================================================
                OFFICIAL DIGITAL FORENSIC EVIDENCE CERTIFICATE
                   CHAT DOCKET CRYPTOGRAPHIC VERIFICATION
================================================================================

CERTIFICATE ID:     CD-CERT-${Date.now().toString(36).toUpperCase()}
GENERATED ON:       ${dateNow} (UTC)
CASE REFERENCE:     ${branding.caseReference || 'UNASSIGNED'}
EXHIBIT DESIGNATION:${branding.exhibitLetter || 'Exhibit A'}
LAW FIRM / COUNSEL: ${branding.lawFirmName || 'Private Submission'}

--------------------------------------------------------------------------------
1. SOURCE FILE VERIFICATION (FORENSIC INTEGRITY)
--------------------------------------------------------------------------------
Original File Name: ${metadata.fileName}
File Size (Bytes):  ${metadata.fileSizeBytes.toLocaleString()} bytes
Algorithm:          SHA-256 (FIPS 180-4 Secure Hash Standard)
Cryptographic Hash: ${metadata.sha256Hash || 'N/A'}
Extraction Engine:  Chat Docket Client-Side Web Crypto API

--------------------------------------------------------------------------------
2. RECORD SCHEDULE & QUANTITATIVE AUDIT
--------------------------------------------------------------------------------
Total Lines Scanned:          ${metadata.totalLines}
Total Chronological Messages: ${metadata.parsedMessagesCount}
Total Voice & Video Calls:    ${metadata.totalCalls}
Total Verified Media Blobs:   ${metadata.totalMedia}
Timeline Span:                ${metadata.timeSpanMonths} Month(s)
Date Commenced:               ${metadata.startDate ? metadata.startDate.toUTCString() : 'Unknown'}
Date Concluded:               ${metadata.endDate ? metadata.endDate.toUTCString() : 'Unknown'}

--------------------------------------------------------------------------------
3. PARTIES IN COMMUNICATION
--------------------------------------------------------------------------------
Applicant / Party 1:          ${branding.applicantName || metadata.participants[0] || 'Unknown'}
Sponsor / Party 2:            ${branding.sponsorName || metadata.participants[1] || 'Unknown'}

--------------------------------------------------------------------------------
4. STATUTORY DECLARATION / STATEMENT OF TRUTH
--------------------------------------------------------------------------------
"I believe that the facts stated in this witness statement, communication schedule, 
and attached exhibits are true. I understand that proceedings for contempt of 
court or visa rejection may be brought against anyone who makes, or causes to be 
made, a false statement in a document verified by a statement of truth without 
an honest belief in its truth."

Verified by Applicant: _________________________   Date: _______________

Verified by Sponsor:   _________________________   Date: _______________

--------------------------------------------------------------------------------
5. CLIENT-SIDE PRIVACY SEAL
--------------------------------------------------------------------------------
This certificate confirms that the parsing, cryptographic hashing, and document
generation took place 100% in local browser memory without uploading any data
to external servers. Zero server logs exist.

Generated via Chat Docket — WhatsApp to Legal & Visa PDF Exporter
Web: https://chatdocketofficial.vercel.app
================================================================================`;

  const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Forensic_Verification_Certificate_${branding.caseReference || 'Exhibit'}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

