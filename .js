const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;
const symbol_count = {
    "A": 3,
    "B": 4,
    "C": 6,
    "D": 8
}
const symbol_value = {
    "A": 6,
    "B": 5,
    "C": 4,
    "D": 2
}
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter deposit Amount: ");
        const balance = parseFloat(depositAmount);
        if (isNaN(balance) || balance <= 0) {
            console.log("Enter a Valid number! ");
        }
        else {
            return balance;
        }
    }
};
const getnumoflines = () => {
    while (true) {
        const noofline = prompt("Enter number of lines to bet on(1-3): ");
        const lines = parseFloat(noofline);
        if (isNaN(lines) || lines <= 0 || lines >= 4) {
            console.log("Enter a Valid number! ");
        }
        else {
            return lines;
        }
    }
}
const bet = (balance, lines) => {
    while (true) {
        const getbet = prompt("Enter the bet per line: ");
        const bett = parseFloat(getbet);
        if (isNaN(bett) || bett <= 0 || bett > balance / lines) {
            console.log("Enter a Valid Bet! ");
        }
        else {
            return bett;
        }
    }
};
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbol_count)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = []
    for (let i = 0; i < COLS; i++) {
        reels.push([])
        const reelsymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomindex = Math.floor(Math.random() * reelsymbols.length);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomindex, 1);
        }
    }
    return reels;
};
const transpose = (reels) => {
    const rows = [];
    for (i = 0; i < ROWS; i++) {
        rows.push([])
        for (j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}
const printrows = (rows) => {
    for (const row of rows) {
        let rowstring = ""
        for (const [i, symbol] of row.entries()) {
            rowstring += symbol;
            if (i != row.length - 1) {
                rowstring += " | "
            }
        }
        console.log(rowstring)
    }
};

const getwinnings = (rows, lines, bet, symbol_value) => {
    let winnings = 0
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row]
        let allsame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false;
                break;
            }
        }
        if (allsame) {
            winnings += bet * symbol_value[symbols[0]]
        }
    }
    return winnings;
}
const game = () => {
    let balance = deposit();
    while (true) {
        console.log("You have a balance of " + balance)
        const lines = getnumoflines();
        const getbet = bet(balance, lines);
        balance -= getbet * lines;
        const reels = spin();
        const rows = transpose(reels)
        printrows(rows);
        const winnings = getwinnings(rows, lines, getbet, symbol_value);
        balance += winnings;
        console.log("You win " + winnings.toString());
        if (balance <= 0) {
            console.log("You have not money to play");
            break;
        }


        const playagain = prompt("Do you want to play again?(y/n)");
        if (playagain != "y") break;

    }

};
game();