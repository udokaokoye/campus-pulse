// app/providers/QueryProvider.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { persistQueryClient } from '@tanstack/query-persist-client-core';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import React from 'react';
import { AppState } from 'react-native';


// 1. Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      gcTime: 48 * 60 * 60 * 1000,    // keep in cache 48h before garbage collection
      refetchOnMount: false,
      refetchOnWindowFocus: true,     // only if stale
      refetchOnReconnect: true, 
      retry: 2      // only if stale
    },
  },
});

// 2. Hook into AppState (focus refetching)
focusManager.setEventListener((handleFocus) => {
  const sub = AppState.addEventListener('change', (state) => {
    handleFocus(state === 'active');
  });
  return () => sub.remove();
});

// 3. Hook into NetInfo (online/offline detection)
onlineManager.setEventListener((setOnline) => {
  const sub = NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected && !!state.isInternetReachable);
  });
  return () => sub();
});

// 4. Persist cache in AsyncStorage
const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'RQ_CACHE',
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 24 * 60 * 60 * 1000, // 24h persistence
});
export default function QueryProvider({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
