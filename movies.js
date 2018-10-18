var express = require('express');
var router = express.Router();

var movies = [
   {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
   {id: 102, name: "Inception", year: 2010, rating: 8.7},
   {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
   {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];

router.get('/', (req, res) => {
    res.json(movies)
});

router.get('/:id', (req, res) => {
    var currMovie = movies.filter((movie) => {
        if (movie.id == req.params.id) {
            return true;
        }
    });

    if (currMovie.length == 1) {
        res.json(currMovie[0]);
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
});

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.year || !req.body.rating) {
        res.status(400);
        res.json({message: 'Bad Request'});

    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.json({
            message: 'New movie created',
            location: '/movies/' + newId
        });
    }
});

router.delete('/:id', (req, res) => {
    var removeIndex = movies.map((movie) => {
      return movie.id;
    }).indexOf(Number(req.params.id));

    if (removeIndex === -1) {
        res.json({message: 'Not found'});
    } else {
        movies.splice(removeIndex, 1);
        res.json({
            message: 'Movie id ' + req.params.id + ' removed'
        });
    }
});

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.year || !req.body.rating || !req.params.id) {
        res.status(400);
        res.json({message: 'Bad Request'});
        
    } else {
        // Get index
        var updateIndex = movies.map((movie) => {
            return movie.id;
        }).indexOf(Number(req.params.id));

        if (updateIndex === -1) {
            // Movie not found, create new
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({
                message: 'New movie created.',
                location: '/movies/' + req.params.id
            });

        } else {
            // Update existing movie
            movies[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({
                message: 'Movie id ' + req.params.id + ' updated.',
                location: '/movies/' + req.params.id
            });
        }
    }
});

// Router will go here
module.exports = router;
