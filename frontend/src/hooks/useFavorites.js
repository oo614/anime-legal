import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const user = userRes?.user;
        if (!user) {
          if (mounted) setFavorites([]);
          return;
        }
        const { data, error } = await supabase
          .from('favorites')
          .select('anime_id')
          .eq('user_id', user.id);
        if (error) throw error;
        if (mounted) setFavorites(data.map((r) => r.anime_id));
      } catch (e) {
        console.error('loadFavorites error', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      load();
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const addFavorite = async (animeId) => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('favorites').insert([{ user_id: user.id, anime_id: animeId }]);
    if (error) throw error;
    setFavorites((s) => Array.from(new Set([...s, animeId])));
  };

  const removeFavorite = async (animeId) => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('favorites').delete().match({ user_id: user.id, anime_id: animeId });
    if (error) throw error;
    setFavorites((s) => s.filter((id) => id !== animeId));
  };

  const toggleFavorite = async (animeId) => {
    if (favorites.includes(animeId)) {
      await removeFavorite(animeId);
    } else {
      await addFavorite(animeId);
    }
  };

  return { favorites, loading, addFavorite, removeFavorite, toggleFavorite };
}
