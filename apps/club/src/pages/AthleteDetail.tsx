import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { runFlow } from '../utils/runFlow';
import Tabs, { useTabState } from '@ui/components/Tabs';
import DocumentList from '@ui/components/DocumentList';
import UploadDropzone from '@ui/components/UploadDropzone';
import FeeStatusBadge from '@ui/components/FeeStatusBadge';

interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  position: string;
  team_id: string;
  club_id: string;
  attributes: {
    pace: number;
    shooting: number;
    passing: number;
    defending: number;
    physical: number;
  };
  status: 'active' | 'injured' | 'suspended';
  contract_end: string;
  market_value: number;
}

interface Document {
  id: string;
  type: string;
  file_name: string;
  file_url: string;
  expires_at?: string;
  created_at: string;
  uploaded_by: string;
}

interface Note {
  id: string;
  note_text: string;
  created_at: string;
  coach_id: string;
  coach_name: string;
  visibility: string;
  tags: string[];
  priority: string;
}

interface CalendarEvent {
  id: string;
  type_enum: string;
  due_at: string;
  description: string;
  status: string;
}

export default function AthleteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [noteVisibility, setNoteVisibility] = useState('team');
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [notePriority, setNotePriority] = useState('medium');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const isExpired = (dateString?: string): boolean => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const tabs = [
    { id: 'profile', label: 'Profilo', icon: '👤' },
    { 
      id: 'documents', 
      label: 'Documenti', 
      icon: '📄', 
      badge: documents.filter(d => isExpired(d.expires_at)).length 
    },
    { id: 'notes', label: 'Note Tecniche', icon: '📝', badge: notes.length },
    { 
      id: 'notifications', 
      label: 'Notifiche', 
      icon: '🔔', 
      badge: events.filter(e => e.status === 'pending').length 
    }
  ];

  const { activeTab, setActiveTab, isActive } = useTabState(tabs, 'profile');

  useEffect(() => {
    loadAthleteData();
  }, [id]);

  const loadAthleteData = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await runFlow("Athlete_GetDetail", { athlete_id: id });
      setAthlete(data.athlete);
      setDocuments(data.documents || []);
      setNotes(data.notes || []);
      setEvents(data.events || []);

    } catch (err) {
      setError('Errore nel caricamento dei dati atleta');
      console.error('Load athlete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (file: File) => {
    try {
      await runFlow('Document_Upload', {
        athlete_id: id,
        file,
        type: 'certificato_medico'
      });

      await loadAthleteData();

    } catch (error) {
      console.error('Upload error:', error);
      throw new Error("Errore durante l'upload del documento");
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setIsAddingNote(true);
    try {
      await runFlow('Athlete_AddNote', {
        athlete_id: id,
        note_text: newNote,
        visibility: noteVisibility,
        tags: noteTags,
        priority: notePriority
      });
      
      // Reset form
      setNewNote('');
      setNoteTags([]);
      setNotePriority('medium');
      
      // Refresh notes
      await loadAthleteData();
      
    } catch (error) {
      console.error('Add note error:', error);
    } finally {
      setIsAddingNote(false);
    }
  };

  const toggleNoteTag = (tag: string) => {
    setNoteTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          {error || 'Atleta non trovato'}
        </div>
        <button 
          onClick={() => navigate('/athletes')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Torna alla Lista Atleti
        </button>
      </div>
    );
  }

  return (
    <main className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {athlete.first_name} {athlete.last_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {athlete.position} • {new Date().getFullYear() - new Date(athlete.birth_date).getFullYear()} anni
          </p>
        </div>
        <div className="flex items-center gap-4">
          <FeeStatusBadge />
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            athlete.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
            athlete.status === 'injured' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
          }`}>
            {athlete.status === 'active' ? 'Disponibile' :
             athlete.status === 'injured' ? 'Infortunato' : 'Sospeso'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="profile" onTabChange={setActiveTab}>
        {/* Profile Tab */}
        {isActive('profile') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">Informazioni Generali</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Data di nascita:</span>
                    <span>{new Date(athlete.birth_date).toLocaleDateString('it-IT')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Posizione:</span>
                    <span>{athlete.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Contratto fino:</span>
                    <span>{new Date(athlete.contract_end).toLocaleDateString('it-IT')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Valore di mercato:</span>
                    <span className="font-semibold">€{athlete.market_value.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">Attributi</h3>
                <div className="space-y-3">
                  {Object.entries(athlete.attributes).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">
                        {key === 'pace' ? 'Velocità' :
                         key === 'shooting' ? 'Tiro' :
                         key === 'passing' ? 'Passaggio' :
                         key === 'defending' ? 'Difesa' :
                         key === 'physical' ? 'Fisico' : key}:
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold w-8 text-right">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {isActive('documents') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Area */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Carica Nuovo Documento</h3>
                <UploadDropzone 
                  onUpload={handleDocumentUpload}
                  accept=".pdf,.png,.jpg,.jpeg"
                  maxSize={10 * 1024 * 1024}
                />
              </div>

              {/* Documents List */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Documenti Esistenti
                  {documents.filter(d => isExpired(d.expires_at)).length > 0 && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-sm rounded-full">
                      {documents.filter(d => isExpired(d.expires_at)).length} scaduti
                    </span>
                  )}
                </h3>
                <DocumentList 
                  documents={documents}
                  onDocumentClick={(doc) => window.open(doc.file_url, '_blank')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {isActive('notes') && (
          <div className="space-y-6">
            {/* Add Note Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Aggiungi Nota Tecnica</h3>
              <div className="space-y-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Inserisci una nota tecnica sull'atleta..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={4}
                  maxLength={2000}
                />
                
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">Categorie:</label>
                  <div className="flex flex-wrap gap-2">
                    {['tattica', 'fisica', 'mentale', 'disciplinare', 'comportamento', 'sviluppo'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleNoteTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          noteTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority and Visibility */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priorità:</label>
                    <select
                      value={notePriority}
                      onChange={(e) => setNotePriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    >
                      <option value="low">Bassa</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Visibilità:</label>
                    <select
                      value={noteVisibility}
                      onChange={(e) => setNoteVisibility(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    >
                      <option value="private">Solo io</option>
                      <option value="team">Team tecnico</option>
                      <option value="staff">Tutto lo staff</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {newNote.length}/2000 caratteri
                  </span>
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || isAddingNote}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isAddingNote && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    {isAddingNote ? 'Aggiungendo...' : 'Aggiungi Nota'}
                  </button>
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Note Esistenti ({notes.length})</h3>
              {notes.length > 0 ? (
                notes.map(note => (
                  <div key={note.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{note.coach_name}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(note.created_at).toLocaleDateString('it-IT')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(note.priority)}`}>
                          {note.priority === 'high' ? 'Alta' : note.priority === 'medium' ? 'Media' : 'Bassa'}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {note.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{note.note_text}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Visibilità: {note.visibility === 'private' ? 'Privata' : note.visibility === 'team' ? 'Team' : 'Staff'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Nessuna nota tecnica presente</p>
              )}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {isActive('notifications') && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Eventi e Notifiche ({events.length})</h3>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        {event.type_enum === 'visita_medica' ? '🏥 Visita Medica' :
                         event.type_enum === 'compleanno' ? '🎂 Compleanno' :
                         event.type_enum === 'convocazione' ? '📋 Convocazione' : event.type_enum}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                      <p className="text-sm text-gray-500">
                        Scadenza: {new Date(event.due_at).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {event.status === 'pending' ? 'In attesa' : 'Completato'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Nessuna notifica presente</p>
            )}
          </div>
        )}
      </Tabs>
    </main>
  );
}