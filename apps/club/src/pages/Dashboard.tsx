import React, { useState, useEffect } from 'react';

interface NotificationBadge {
  count: number;
  hasUnread: boolean;
}

export default function Dashboard() {
  const [notificationBadge, setNotificationBadge] = useState<NotificationBadge>({ count: 0, hasUnread: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotificationBadge();
  }, []);

  const loadNotificationBadge = async () => {
    try {
      // TODO: Replace with actual API call to log_notifications
      // const unreadNotifications = await log_notifications.find({
      //   user_id: currentUser.id,
      //   read_at: null
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock unread notifications
      const mockUnreadCount = Math.floor(Math.random() * 5); // 0-4 random notifications
      
      setNotificationBadge({
        count: mockUnreadCount,
        hasUnread: mockUnreadCount > 0
      });
      
    } catch (error) {
      console.error('Error loading notification badge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = () => {
    // TODO: Navigate to notifications page or open notifications panel
    console.log('Opening notifications...');
  };

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header with Notification Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard Sport Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Panoramica generale del club
          </p>
        </div>
        
        {/* Notification Badge */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleNotificationClick}
            className="relative p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Notifiche${notificationBadge.hasUnread ? ` - ${notificationBadge.count} non lette` : ''}`}
          >
            <div className="text-xl">🔔</div>
            
            {/* Badge Counter */}
            {notificationBadge.hasUnread && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
                {notificationBadge.count > 9 ? '9+' : notificationBadge.count}
              </div>
            )}
            
            {/* Loading indicator */}
            {loading && (
              <div className="absolute -top-1 -right-1 bg-gray-400 rounded-full w-3 h-3 animate-pulse"></div>
            )}
          </button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? 'Caricamento...' : 
             notificationBadge.hasUnread ? `${notificationBadge.count} notifiche` : 
             'Nessuna notifica'}
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Atleti Totali</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prossime Partite</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
            </div>
            <div className="text-3xl">⚽</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Documenti Scaduti</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">2</p>
            </div>
            <div className="text-3xl">📄</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quote Pagate</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">18/24</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Attività Recenti
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl">📋</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Formazione inviata per Juventus vs Milan
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2 ore fa • Allenatore Rossi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl">📄</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Documento caricato per Marco Bianchi
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                5 ore fa • Dirigente Verdi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl">👤</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Nuovo atleta registrato: Luigi Neri
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                1 giorno fa • Sistema
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-sm transition-colors text-left">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-lg font-semibold">Gestisci Atleti</h3>
          <p className="text-blue-100 text-sm">Visualizza e modifica la rosa</p>
        </button>

        <button className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-sm transition-colors text-left">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="text-lg font-semibold">Calendario Eventi</h3>
          <p className="text-green-100 text-sm">Programma allenamenti e partite</p>
        </button>

        <button className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-sm transition-colors text-left">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-semibold">Report & Analytics</h3>
          <p className="text-purple-100 text-sm">Analizza le performance</p>
        </button>
      </div>

      {/* Notifications Panel (if badge clicked) */}
      {notificationBadge.hasUnread && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="text-yellow-600 dark:text-yellow-400">⚠️</div>
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                Hai {notificationBadge.count} notifiche non lette
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Clicca sull'icona delle notifiche per visualizzarle tutte
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}