const loadData = (searchValue, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(res => res.json())
        .then(data =>displayData(data.data, dataLimit))
}

const displayData = (phones, dataLimit) => {
    console.log(phones);
    const phoneContainer = document.getElementById('phones-container');
    // display 10 only
    const showAll = document.getElementById('btn-show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, dataLimit);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        // console.log(phone);
        const {image, phone_name} = phone;
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('col');
        phoneCard.innerHTML = `
        <div class="card p-4">
        <img src="${image}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead....
          </p>
        </div>
        <button type="button" class="btn btn-info">Details</button>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
}
document.getElementById('search-value').addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        displayBySearch(10)
    }
})

const displayBySearch = (dataLimit) => {
    const searchValue = document.getElementById('search-value').value;
    loadData(searchValue, dataLimit);
}


// loadData('apple');
