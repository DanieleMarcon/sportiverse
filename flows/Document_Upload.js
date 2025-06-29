import { checkPermission } from '@/services/auth/checkPermission';
import { ACL } from '@/services/auth/acl';
import { documents } from 'bolt:data';
import { uploadFile } from '@/services/storage';

export default async function Document_Upload(input, context) {
  // Controllo ACL - Solo DIRIGENTE+ può caricare documenti
  await checkPermission(context.user.id, context.club.id, ACL.DOCUMENT_UPLOAD);
  
  // Validazione input
  if (!input.athlete_id || !input.file || !input.type) {
    throw new Error('INVALID_INPUT: athlete_id, file e type sono obbligatori');
  }
  
  // Validazione tipo documento
  const validTypes = ['cartellino', 'visita_medica', 'nulla_osta', 'certificato_medico', 'assicurazione'];
  if (!validTypes.includes(input.type)) {
    throw new Error(`INVALID_TYPE: tipo deve essere uno di ${validTypes.join(', ')}`);
  }
  
  // Validazione formato file
  const allowedFormats = ['pdf', 'png', 'jpg', 'jpeg'];
  const fileExtension = input.file.name.split('.').pop().toLowerCase();
  if (!allowedFormats.includes(fileExtension)) {
    throw new Error(`INVALID_FORMAT: formato deve essere uno di ${allowedFormats.join(', ')}`);
  }
  
  // Validazione dimensione file (max 10MB)
  if (input.file.size > 10 * 1024 * 1024) {
    throw new Error('FILE_TOO_LARGE: dimensione massima 10MB');
  }
  
  try {
    // Upload file su storage
    const fileUrl = await uploadFile(input.file);
    
    // Salva record documento
    const documentId = await documents.insert({
      athlete_id: input.athlete_id,
      type: input.type,
      file_url: fileUrl,
      file_name: input.file.name,
      file_size: input.file.size,
      expires_at: input.expires_at || null,
      uploaded_by: context.user.id,
      club_id: context.club.id,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    // Log operazione per audit
    console.log(`[AUDIT] Document uploaded: ${documentId} by user ${context.user.id}`);
    
    return { 
      document_id: documentId, 
      file_url: fileUrl,
      success: true,
      message: 'Documento caricato con successo'
    };
    
  } catch (error) {
    console.error('[ERROR] Document upload failed:', error);
    throw new Error(`UPLOAD_FAILED: ${error.message}`);
  }
}