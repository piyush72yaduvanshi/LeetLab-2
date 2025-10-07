import { db } from '../libs/db.js';

export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Playlist name is required' });
    }

    // Check if playlist with same name already exists for this user
    const existingPlaylist = await db.playlist.findFirst({
      where: {
        name: name.trim(),
        userId,
      },
    });

    if (existingPlaylist) {
      return res.status(400).json({ 
        error: 'A playlist with this name already exists' 
      });
    }

    const playList = await db.playlist.create({
      data: {
        name: name.trim(),
        description: description?.trim() || '',
        userId,
      },
    });
    
    res.status(201).json({
      success: true,
      message: 'Playlist created successfully',
      playList,
    });
  } catch (error) {
    console.error('Error creating playlist:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'A playlist with this name already exists' 
      });
    }
    
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

export const getPlayAllListDetails = async (req, res) => {
  try {
    const playLists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include:{
        problems: {
          include: {
            problem: true,
          },
        },
      }
    });
    res.status(200).json({
      success: true,
      message: 'Playlist fetched successfully',
      playLists,
    });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
};
export const getPlayListDetails = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playList = await db.playlist.findFirst({
      where: { 
        id: playlistId,
        userId: req.user.id 
      },
      include: {
        problems: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                description: true,
                difficulty: true,
                tags: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!playList) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    res.status(200).json({
      success: true,
      message: 'Playlist fetched successfully',
      playList,
    });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body; // Accept an array of problem IDs

  console.log('Adding problems to playlist:', { playlistId, problemIds });
  
  try {
    // Ensure problemIds is an array
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing problemIds' });
    }

    // Verify playlist exists and belongs to user
    const playlist = await db.playlist.findFirst({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    // Check which problems already exist in the playlist
    const existingProblems = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    const existingProblemIds = existingProblems.map(p => p.problemId);
    const newProblemIds = problemIds.filter(id => !existingProblemIds.includes(id));

    if (newProblemIds.length === 0) {
      return res.status(400).json({ 
        error: 'All selected problems are already in this playlist',
        existingProblems: existingProblemIds 
      });
    }

    // Create records for new problems only
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: newProblemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
      skipDuplicates: true, // Skip duplicates if any
    });

    res.status(201).json({
      success: true,
      message: `${newProblemIds.length} problem(s) added to playlist successfully`,
      problemsInPlaylist,
      addedCount: newProblemIds.length,
      skippedCount: existingProblemIds.length,
    });
  } catch (error) {
    console.error('Error adding problems to playlist:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'One or more problems are already in this playlist' 
      });
    }
    
    res.status(500).json({ error: 'Failed to add problems to playlist' });
  }
};

export const deletePlayList = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Playlist deleted successfully',
      deletedPlaylist,
    });
  } catch (error) {
    console.error('Error deleting playlist:', error.message);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing problemIds' });
    }
// Only delete given problemIds not all
   
    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'Problem removed from playlist successfully',
      deletedProblem,
    });
  } catch (error) {
    console.error('Error removing problem from playlist:', error.message);
    res.status(500).json({ error: 'Failed to remove problem from playlist' });
  }
};
