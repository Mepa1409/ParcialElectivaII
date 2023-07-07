const fs = require('fs')

const save_data = (file, object) => {

    const stats = fs.statSync('data/' + file)

    if (stats.size === 0) {

        const array = []

        array.push(object)

        return write_file(file, JSON.stringify(array))
    }

    const old_array = fs.readFileSync('data/' + file).toString()

    const array = JSON.parse(old_array)

    array.push(object)

    return write_file(file, JSON.stringify(array))

}

const write_file = (file, data) => {
    fs.writeFileSync('data/' + file, data)
}

const read_file = (file) => {

    const stats = fs.statSync('data/' + file)
    const array = fs.readFileSync('data/' + file).toString()

    if (stats.size === 0) {
        return []
    }

    return JSON.parse(array)
}

module.exports = {save_data, write_file, read_file}