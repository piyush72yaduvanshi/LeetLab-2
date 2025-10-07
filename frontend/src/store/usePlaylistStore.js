import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  createPlaylist: async (playlistData) => {
    try {
      set({ isLoading: true, error: null });
      
      // Validate input on frontend
      if (!playlistData.name || playlistData.name.trim().length === 0) {
        throw new Error("Playlist name is required");
      }

      const response = await axiosInstance.post(
        "/playlist/create-playlist",
        {
          name: playlistData.name.trim(),
          description: playlistData.description?.trim() || '',
        }
      );

      set((state) => ({
        playlists: [...state.playlists, response.data.playList],
      }));

      toast.success("Playlist created successfully");
      return response.data.playList;
    } catch (error) {
      console.error("Error creating playlist:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to create playlist";
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllPlaylists: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/playlist");
      set({ playlists: response.data.playLists });
    } catch (error) {
      console.error("Error fetching playlists:", error);
      toast.error("Failed to fetch playlists");
    } finally {
      set({ isLoading: false });
    }
  },

  getPlaylistDetails: async (playlistId) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(`/playlist/${playlistId}`);
      set({ currentPlaylist: response.data.playList });
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      toast.error("Failed to fetch playlist details");
    } finally {
      set({ isLoading: false });
    }
  },

  addProblemToPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true, error: null });
      
      if (!playlistId || !problemIds || problemIds.length === 0) {
        throw new Error("Invalid playlist or problem selection");
      }

      const response = await axiosInstance.post(`/playlist/${playlistId}/add-problem`, {
        problemIds,
      });

      const { addedCount, skippedCount } = response.data;
      
      if (addedCount > 0) {
        toast.success(`${addedCount} problem(s) added to playlist`);
      }
      
      if (skippedCount > 0) {
        toast.info(`${skippedCount} problem(s) were already in the playlist`);
      }

      // Refresh the playlist details
      if (get().currentPlaylist?.id === playlistId) {
        await get().getPlaylistDetails(playlistId);
      }
      
      // Refresh all playlists to update counts
      await get().getAllPlaylists();
      
    } catch (error) {
      console.error("Error adding problem to playlist:", error);
      const errorMessage = error.response?.data?.error || "Failed to add problem to playlist";
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeProblemFromPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/playlist/${playlistId}/remove-problem`, {
        data: { problemIds },
      });

      toast.success("Problem removed from playlist");

      // Refresh the playlist details
      if (get().currentPlaylist?.id === playlistId) {
        await get().getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error("Error removing problem from playlist:", error);
      toast.error("Failed to remove problem from playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/playlist/${playlistId}`);

      set((state) => ({
        playlists: state.playlists.filter((p) => p.id !== playlistId),
      }));

      toast.success("Playlist deleted successfully");
    } catch (error) {
      console.error("Error deleting playlist:", error);
      toast.error("Failed to delete playlist");
    } finally {
      set({ isLoading: false });
    }
  },
}));
