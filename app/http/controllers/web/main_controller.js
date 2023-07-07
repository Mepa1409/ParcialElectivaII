const {read_file} = require('../data/file_controller')

const data = read_file('marvel.json')

const index = (req, res) => {
    return res.render('./page', {movies: JSON.stringify(get_movies())})
}

const get_movies = () => {

    const movies = []

    for (let i in data["Marvel Cinematic Universe"]) {
        movies.push(data["Marvel Cinematic Universe"][i])
    }

    return movies
}

module.exports = {index}