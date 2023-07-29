
const darkModeCheckBox = document.getElementById("darkModeToggle");

const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

let grid = document.getElementsByClassName("container-grid")[0];
const list = document.getElementsByClassName("container-list")[0];

const gridTab = document.getElementById("tab1-heading");
const listTab = document.getElementById("tab2-heading");

const gridCont = document.getElementsByClassName("container-grid")[0];
const table = document.getElementsByTagName("table")[0];



//elements for dark mode
const logo=document.querySelector(".logo>a");
const header=document.querySelector(".header");
const menuButtons=document.getElementsByClassName("menu-buttons");
const tabHeadings=document.getElementsByClassName("tab-heading");
const coinTitles=document.querySelectorAll("td b");




//for switching tab
gridTab.addEventListener("click", () => {
      grid.style.visibility = "visible"
     list.style.visibility = "hidden";
  

   
    gridTab.style.borderBottom = "1px solid #2196F3";
    gridTab.style.color = "#2196F3";
    listTab.style.borderBottom = "none";

    listTab.style.color = "rgb(167 167 167)";
});

// Event listener for list tab
listTab.addEventListener("click", () => {
    grid.style.visibility = "hidden";
    list.style.visibility = "visible";
    

    gridTab.style.borderBottom = "none";
    gridTab.style.color = "rgb(167 167 167)";

    listTab.style.borderBottom = "1px solid #2196F3";
    listTab.style.color = "#2196F3";
});

//for dark mode
darkModeCheckBox.addEventListener("input", () => {

    //dark mode
    if (document.body.style.backgroundColor === "white") {
       
        document.body.style.backgroundColor = "black"
        logo.style.color="white";
        header.style.borderBottom="none"
        Array.from(menuButtons).forEach(button => {
            button.classList.remove("white_bg");
        
            
        });
        coinTitles.forEach(title=>{
            title.style.color="white    ";
        })
       

    } else {
        
        
        document.body.style.backgroundColor = "white";
        logo.style.color="black";
        header.style.borderBottom="2px solid #4340402f"
        Array.from(menuButtons).forEach(button => {
            button.classList.add("white_bg");
            
        });
        coinTitles.forEach(title=>{
            title.style.color="grey";
        })



      
    }
})

//for fetching
async function fetchData() {
    try {
        const response = await fetch(apiUrl);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Process the data
        console.log(data);
        addItems(data);// Output the fetched data to the console
        // You can perform further processing with the data here
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
    }
}

// Call the function to fetch the data
fetchData();


function addItems(data) {

    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = `${data[i].id}`;

        let idd = card.id;

        let imageUrl = data[i].image;
        let percentage = data[i].price_change_percentage_24h;
        let currentPrice = data[i].current_price;
        let volume = data[i].total_volume;
        let cap = data[i].market_cap;

        card.innerHTML = ` <div class="card-hero">

        <div class="card-image">
            <img class="coin-logos" src="${imageUrl}" alt="">
        </div>
        <div class="card-titles">
            <b>${data[i].id}</b>
            <p>${data[i].name}</p>
        </div>

    </div>

    <div class="rate-container" >
        <span id="${idd}-rate" class="rate">${percentage}</span>
    </div>

    <div class="price-container">
        <span class="price" id="${idd}-price">$ ${currentPrice}</span>
    </div>
    <div class="volume-container">
        <span class="total-volume" id="${idd}-volume">total volume: ${volume} </span>
    </div>
    <div class="market-container">
        <span class="market-cap" id="${idd}-cap">Market Cap : $ ${cap}</span>
    </div>`

       

        const row = document.createElement("tr");
        row.id = "row" + idd;
       let rowID=row.id;
        row.innerHTML = ` <td>
    <div class="hero">
       <img src="${imageUrl}" class="coin-logos" alt="">
    </div>
</td>
<td>
    <div class="card-titles" style="text-align: left;">
    <b>${data[i].id}</b>
    <p>${data[i].name}</p>
    </div>
</td>
<td>
    <div class="rate-container">
        <span id="${rowID}-rate" class="rate">${percentage}</span>
    </div>
</td>
<td>
    <div class="price-container">
        <span class="price" id="${rowID}-price">$ ${currentPrice}</span>
    </div>
</td>
<td>
    <div class="volume-container">
        <span class="total-volume" id="${rowID}-volume"> ${volume} </span>
    </div>
</td>
<td>
    <div class="market-container">
        <span class="market-cap" id="${rowID}-cap">$ ${cap}</span>
    </div>
</td>`


        gridCont.appendChild(card);
        table.appendChild(row);

        if (data[i].price_change_percentage_24h < 0) {
            const changePercentage = document.getElementById(`${idd}-rate`);
            changePercentage.style.color = "red";
            changePercentage.parentElement.style.border = "2px solid red";
            

            const price = document.getElementById(`${idd}-price`);
            price.style.color = "red";

            const changePercentageTable=document.getElementById(`${rowID}-rate`);
            changePercentageTable.style.color="red";
            console.log(changePercentageTable.parentElement);
            changePercentageTable.parentElement.style.border = "2px solid red";
            

            const priceTable=document.getElementById(`${rowID}-price`);
            priceTable.style.color="red";

        }
        else {

            const changePercentage = document.getElementById(`${idd}-rate`);
            changePercentage.style.color = "rgb(61, 133, 62)";
            changePercentage.parentElement.style.border = "2px solid rgb(61, 133, 62);"

            const price = document.getElementById(`${data[i].id}-price`);
            price.style.color = "rgb(89, 195, 91)";


            const changePercentageTable=document.getElementById(`${rowID}-rate`);
            changePercentageTable.style.color="rgb(61, 133, 62)";
            changePercentageTable.parentElement.style.border = " 2px solid rgb(61, 133, 62);"

            const priceTable=document.getElementById(`${rowID}-price`);
            priceTable.style.color="rgb(89, 195, 91)";

        }
    }
}