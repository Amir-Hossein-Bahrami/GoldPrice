// api key: '6d8ebf74ca2c3b3c48be176ae6247f94'

const apiCode = "6d8ebf74ca2c3b3c48be176ae6247f94";
const type = "gold";
let data = null;
let price18;
let price24;
let sekeeEmami;
let sekeeNim;
let sekeeRob;

async function getPrice() {
    const url = `https://nerkh-api.ir/api/${apiCode}/${type}/`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        data = await response.json();
        fillTable();
        console.log(data);
    } catch (error) {

        console.log(error);
        console.table(data);
        console.log(JSON.stringify(data, null, 2));
    }
}

function fillTable(){
    price18 = Number(data.data.prices.geram18.current);
    document.getElementById("gold-18-price").textContent = price18.toLocaleString("fa-IR");

    price24 = Number(data.data.prices.geram24.current);
    document.getElementById("gold-24-price").textContent = price24.toLocaleString("fa-IR");

    sekeeEmami = Number(data.data.prices.sekee_emami.current);
    document.getElementById("seke-tamam-price").textContent = sekeeEmami.toLocaleString("fa-IR");

    sekeeNim = Number(data.data.prices.nim.current);
    document.getElementById("seke-nim-price").textContent = sekeeNim.toLocaleString("fa-IR");

    sekeeRob = Number(data.data.prices.rob.current);
    document.getElementById("seke-rob-price").textContent = sekeeRob.toLocaleString("fa-IR");
}

getPrice();


const goldTypeBuy = document.getElementById("gold-type");
const goldAmountBuy = document.getElementById("gold-amount");
goldTypeBuy.addEventListener("change", () => calculatePrice(true));
goldAmountBuy.addEventListener("input", () => calculatePrice(true));

const goldTypeSell = document.getElementById("sell-gold-type");
const goldAmountSell = document.getElementById("sell-gold-amount");
goldTypeSell.addEventListener("change", () => calculatePrice(false));
goldAmountSell.addEventListener("input", () => calculatePrice(false));

function calculatePrice(isBuy){

    let selectedType;
    let amount;
    let unitPrice;

    if(isBuy){
        selectedType = goldTypeBuy.value;
        amount = Number(goldAmountBuy.value);
    }
    else{
        selectedType = goldTypeSell.value;
        amount = Number(goldAmountSell.value);
    }

    if(selectedType === "" || amount <= 0){
        return;
    }

    if(selectedType === "gold18"){
        unitPrice = price18;
    }
    else if(selectedType === "gold24"){
        unitPrice = price24;
    }
    else if(selectedType === "emami"){
        unitPrice = sekeeEmami;
    }
    else if(selectedType === "nim"){
        unitPrice = sekeeNim;
    }
    else if(selectedType === "rob"){
        unitPrice = sekeeRob;
    }

    const total = unitPrice * amount;

    if(isBuy){
        document.getElementById("gold-price").textContent =
            total.toLocaleString("fa-IR") + " ریال";
    }
    else{
        document.getElementById("sell-gold-price").textContent =
            total.toLocaleString("fa-IR") + " ریال";
    }
}