const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1'
const table = document.querySelector('.table-body')
fetch(URL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'


    }
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        let count = 0;
        for (const item of data) {
            const row = `<th scope="row">${item.id}</th>
                                 <td>${item.symbol}</td>
                                 <td>${item.name}</td>`;
            const tr = document.createElement('tr');
            if (item.symbol !== 'usdt' && count < 5) {
                tr.classList.add('bg-primary');
                count++;
            } else if (item.symbol === 'usdt') {
                tr.classList.add('bg-success');
            }
            tr.innerHTML = row;
            table.appendChild(tr);
        }
    })
    .catch(error => {
        console.log(error.message);
    });



