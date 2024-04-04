let data = [];
const Api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
const table = document.getElementById('crypto-data');
const search = document.getElementById('search');
const sortByMktCap = document.getElementById('sort1');
const sortByPercentage = document.getElementById('sort2');
const loader = document.getElementById('loader'); 

async function fetchedData() {
    try {
        loader.style.display = "block";
        const response = await fetch(Api);
        data = await response.json();
        showData(data);
        addEventListeners(); 
    } catch (e) {
        alert(e);
    } finally {
        loader.style.display = "none"; 
    }
}

function showData(data) {
    
    table.innerHTML = '';

    
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr');
        const twenty24HrChange = data[i].price_change_percentage_24h;
        const percentage = twenty24HrChange <= 0 ? "negative" : "positive";
        tr.innerHTML = `
            <td><img src="${data[i].image}" alt=""> ${data[i].id}</td>
            <td>${data[i].symbol}</td>
            <td>${data[i].current_price}</td>
            <td>${data[i].total_volume}</td>
            <td class="${percentage}">${twenty24HrChange}</td>
            <td>Mkt Cap: ${data[i].market_cap}</td>
        `;
        table.appendChild(tr);
    }
}

function addEventListeners() {
    
    sortByMktCap.addEventListener('click', () => {
        const sortedByMktCap = data.sort((a, b) => b.market_cap - a.market_cap);
        showData(sortedByMktCap);
    });

    
    sortByPercentage.addEventListener('click', () => {
        const sortedByPercentage = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        showData(sortedByPercentage);
    });

    
    search.addEventListener('keyup', () => {
        const searchItem = search.value.toLowerCase();
        const filteredData = data.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemSymbol = item.symbol.toLowerCase();
            return itemName.includes(searchItem) || itemSymbol.includes(searchItem);
        });
        showData(filteredData);
    });
}

fetchedData();