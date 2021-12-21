// app.post('/:id', (req, res)
export const fetchAddGood = (id) => {
    fetch(`${URL}/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
}

// app.get('/basketgoods', (req, res)
export const fetchAddBaskedGoods = (id) => {
    return fetch(`${URL}/basketgoods`).then((res) => {
        return res.json();
    }).then((data) => {
        return data;
    });
}

// app.delete('/:id', (req, res)
export const fetchDeleteBaskedGoods = (id) => {
    // console.log(id);
    fetch(`${URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const service = function (url, postfix, method = "GET") {
    return new Promise((resolve, reject) => {
        fetch(`${url}${postfix}`, {
            method
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        });
    });
}