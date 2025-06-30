import React from 'react';

interface Document {
  id: string;
  type: string;
  file_name: string;
  file_url: string;
  expires_at?: string;
  created_at: string;
  uploaded_by: string;
}

interface DocumentListProps {
  documents: Document[];
  onDocumentClick?: (document: Document) => void;
  showExpired?: boolean;
  className?: string;
}

export default function DocumentList({ 
  documents, 
  onDocumentClick, 
  showExpired = true, 
  className = '' 
}: DocumentListProps) {
  
  const isExpired = (dateString?: string): boolean => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const getDocumentTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      'cartellino': 'Cartellino',
      'visita_medica': 'Visita Medica',
      'nulla_osta': 'Nulla Osta',
      'certificato_medico': 'Certificato Medico',
      'assicurazione': 'Assicurazione'
    };
    return typeMap[type] || type;
  };

  const getDocumentIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
      'cartellino': '🆔',
      'visita_medica': '🏥',
      'nulla_osta': '✅',
      'certificato_medico': '📋',
      'assicurazione': '🛡️'
    };
    return iconMap[type] || '📄';
  };

  if (documents.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-4xl mb-2">📄</div>
        <p className="text-gray-500 dark:text-gray-400">
          Nessun documento caricato
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {documents.map((document) => {
        const expired = isExpired(document.expires_at);
        const shouldShow = showExpired || !expired;
        
        if (!shouldShow) return null;

        return (
          <div
            key={document.id}
            onClick={() => onDocumentClick?.(document)}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all duration-200
              hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600
              ${expired 
                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {getDocumentIcon(document.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {getDocumentTypeLabel(document.type)}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {document.file_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Caricato il {new Date(document.created_at).toLocaleDateString('it-IT')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Expiry Badge */}
                {document.expires_at && (
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${expired 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }
                  `}>
                    {expired ? (
                      <>⚠️ Scaduto</>
                    ) : (
                      <>✅ Valido fino al {new Date(document.expires_at).toLocaleDateString('it-IT')}</>
                    )}
                  </div>
                )}

                {/* Download Icon */}
                <div className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  📥
                </div>
              </div>
            </div>

            {/* Expiry Warning */}
            {expired && (
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                <p className="text-sm text-red-700 dark:text-red-400">
                  ⚠️ Documento scaduto il {new Date(document.expires_at!).toLocaleDateString('it-IT')}. 
                  È necessario caricare una versione aggiornata.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}