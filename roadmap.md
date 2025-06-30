# 🗺️ Roadmap per la Demo di Sportiverse

Questa roadmap ti aiuta a tenere traccia delle attività necessarie per una demo locale funzionante di **Sport Manager** e **Allenatore Nato**. Spunta ogni voce quando è stata completata.

## 1. Configurazione di Base
- [x] Clonare il repository e installare le dipendenze con `pnpm install`.
- [ ] Creare `.env.local` con `BOLT_WORKSPACE_ID`, `BOLT_API_KEY`, `JWT_SECRET` e parametri SMTP.
- [x] Avviare il workspace con `pnpm dev` (portali `play`, `club`, `agents`).

## 2. Dati di Esempio
- [ ] Popolare i dataset con atleti, utenti, partite e documenti di test.

## 3. Collegamento Backend e Frontend
- [ ] Verificare che le pagine React richiedano i dati dai Flow e salvino sui dataset.
- [ ] Integrare la sincronizzazione formazioni con `/services/game-api/formation`.

## 4. Notifiche
- [ ] Configurare un provider SMTP nel file `.env.local`.
- [ ] Testare la function `sendDailyAlerts.ts` e controllare `log_notifications`.

## 5. Autenticazione
- [ ] Implementare la generazione di JWT e un endpoint di login di base.
- [ ] Proteggere le rotte CRM con il middleware di autorizzazione.

## 6. Verifica Permessi
- [ ] Applicare `checkPermission.ts` e la mappa ACL a tutti i Flow sensibili.

## 7. Testing
- [ ] Eseguire i test unitari con Vitest.
- [ ] Eseguire i test end-to-end con Playwright.

## 8. Passi Successivi
- [ ] Implementare i moduli degli sprint futuri (Dashboard Analytics, Gestione Pagamenti, Fan Engagement).

