var express = require('express');
var router = express.Router();
var userRoutes = require('./user/user-routes')
var playlistRoutes = require('./playlist/playlist-routes')
var songRoutes = require('./song/song-routes')

router.use('/users',userRoutes);
router.use('/playlists', playlistRoutes)
router.use('/songs', songRoutes)


module.exports = router