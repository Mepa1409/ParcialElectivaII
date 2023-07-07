let title = document.getElementById('title_id')
let releaseYear = document.getElementById('releaseYear_id')
let select = document.getElementById('category_id')
let startDate = document.getElementById('startDate_id')
let endingDate = document.getElementById('endingDate_id')
let queryButton = document.getElementById('queryButton_id')
let allMoviesButton = document.getElementById('allMoviesButton_id')
let table = document.getElementById('table_id')

title.addEventListener('keyup', filters)
releaseYear.addEventListener('keyup', filters)
select.addEventListener('click', filters)
queryButton.addEventListener('click', validateRangDate)
allMoviesButton.addEventListener('click', showMovies)

preloaded()
showMovies()

function preloaded() {
    let movies = removeDuplicates(getMovies(), 'category_name')
    movies.forEach(movie => {
        select.innerHTML += `<option value = "` + movie.category_name + `">` + movie.category_name + `</option>`
    })
}

function removeDuplicates(array, key) {
    let check = new Set()
    return array.filter(item => !check.has(item[key]) && check.add(item[key]))
}

function filters() {

    let movies = getMovies()

    movies = (title.value === '') ? movies : filterByTitle(movies)
    movies = (releaseYear.value === '') ? movies : filterByReleaseYear(movies)
    movies = (select.value === '') ? movies : filterByCategory(movies)
    movies = (startDate.value === '' || endingDate.value === '') ? movies : filterByReleaseDate(movies)

    fillTable(movies)
}

function filterByTitle(movies) {
    return movies.filter(movie => (movie.title.toUpperCase().startsWith(title.value.toUpperCase())))
}

function filterByReleaseYear(movies) {
    return movies.filter(movie => movie.release_year === parseInt(releaseYear.value))
}

function filterByCategory(movies) {
    return movies.filter(movie => (select.value == movie.category_name))
}

function validateRangDate() {

    if (startDate.value === '' || endingDate.value === '') {
        return alert('Por favor complete los campos fecha de inicio y de fin')
    }

    if (startDate.value > endingDate.value) {
        startDate.value = null
        endingDate.value = null
        return alert('La fecha de inicio no puede ser mayor a la fecha de fin')
    }

    filters()
}

function filterByReleaseDate(movies) {

    return movies.filter(movie => {

        let startDateAux = new Date(startDate.value)
        let movieDate = new Date(movie.release_date)
        let endingDateAux = new Date(endingDate.value)

        if (startDateAux < movieDate && movieDate < endingDateAux) {
            return movie
        }

    })

}

function showMovies() {
    let movies = getMovies()
    cleanFields()
    fillTable(movies)
}

function getMovies() {
    return JSON.parse(window.movies)
}

function fillTable(array) {

    table.innerHTML = ''

    array.forEach(item => {
        table.innerHTML += `<tr class="text-center">
        <th scope="row">` + item.movie_id + `</th>
        <td>` + item.title + `</td>
         <td>` + item.category_name + `</td>
        <td>` + item.release_year + `</td>
        <td>` + item.release_date + `</td>
        </tr>`
    })

}

function cleanFields() {
    title.value = ''
    releaseYear.value = ''
    startDate.value = null
    endingDate.value = null
}