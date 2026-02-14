// hooks/useInfiniteEvents.ts
import { useInfiniteQuery } from '@tanstack/react-query';

const TAKE = 10;

type ApiPage = { ['@odata.count']?: number; value: any[] };

async function fetchEventsPage(skip: number, endsAfterISO: string) {
     console.log(`Fetching page: skip=${skip}, take=50`);
  const url =
    `https://campuslink.uc.edu/api/discovery/event/search` +
    `?take=${TAKE}&skip=${skip}&endsAfter=${encodeURIComponent(endsAfterISO)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json: ApiPage = await res.json();
  console.log(`Fetched ${json.value?.length ?? 0} events (total ${json['@odata.count']})`);
  return {
    items: Array.isArray(json.value) ? json.value : [],
    total: typeof json['@odata.count'] === 'number' ? json['@odata.count'] : undefined,
  };
}

export function useInfiniteEvents(endsAfterISO: string) {
  return useInfiniteQuery({
    queryKey: ['events', { endsAfterISO }],
    queryFn: ({ pageParam }) => fetchEventsPage(pageParam ?? 0, endsAfterISO),
    initialPageParam: 0, // skip
    getNextPageParam: (last, pages) => {
  const TAKE = 10;
  const loaded = pages.reduce((n, p) => n + (p.items?.length ?? 0), 0);
  const lastCount = last.items?.length ?? 0;
  const total = last.total ?? loaded;
  return (lastCount < TAKE || loaded >= total) ? undefined : loaded; // next skip
},
    
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
