let money = 20;
var bet = 5;
const symbols = ["🍒", "🍋", "🍊"];


document.addEventListener("DOMContentLoaded", () => {
const spinButton = document.getElementById("spinButton");
       
        spinButton.addEventListener("click", () => {
            if (document.getElementById("bet").value != "") {
            if (document.getElementById("bet").value != "") {
                bet = document.getElementById("bet").value;
                document.getElementById("betDisplay").innerHTML = bet;
            }
            money -= bet;
            console.log(money)
            const slot2 = document.getElementById("slot2");
            const slot3 = document.getElementById("slot3");
            const result = document.getElementById("result");
            
            slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            if (slot1.textContent === slot2.textContent && slot2.textContent === slot3.textContent) {
                result.textContent = "Congratulations! You win! 3/3";
                money += bet * 5;
            } else {
                if (slot1.textContent === slot2.textContent || slot2.textContent === slot3.textContent) {
                    result.textContent = "Congratulations! You win! 2/3";
                    money += bet * 2;
                } else {
                    result.textContent = "Try again! 1/3";
                }
            }
            document.getElementById("money").textContent = money;
            if (money <= 0) {
                alert("lol loser");
                location.reload();
            }
        };
    }
);});