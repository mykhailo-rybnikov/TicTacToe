const COUNTER_OF_ROWS = 3;
const COUNTER_OF_COLUMNS = 3;
const field = document.querySelector('.field');

function appendColumns(row, colsCount, rowId) {
    for (let i = 0; i < colsCount; i++) {
        const id = rowId * 3 + i;
        const column = document.createElement('div');
        column.id = `c-${id}`;
        column.dataset.id = id;
        column.className = 'cell';
        row.appendChild(column);
    }
}

function appendRows(rowsCount, colsCount) {
    for (let i = 0; i < rowsCount; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        appendColumns(row, colsCount, i);
        field.appendChild(row);
    }
}

appendRows(COUNTER_OF_ROWS, COUNTER_OF_COLUMNS);