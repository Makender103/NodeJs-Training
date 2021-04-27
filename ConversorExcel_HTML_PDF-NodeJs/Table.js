class Table {

    constructor(arr) {
        this.header = arr[0];
        arr.shift(); //remover o primeiro elemento
        this.rows = arr; 
    }

    get RowCount() {
        return this.rows.length
    }

    get ColumnCount() {
        return this.header.length
    }
}

module.exports = Table ;