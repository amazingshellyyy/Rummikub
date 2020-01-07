

/* render the default tile in the playground */
/* charToIndex */
const cTI = {
    '1': "1",
    '2': "2",
    '3': "3",
    '4': "4",
    '5': "5",
    '6': "6",
    '7': "7",
    '8': "8",
    '9': "9",
    'a': "10",
    'b': "11",
    'c': "12",
    'd': "13",
}
/* rowToColor */
const rTC = {
    "1": "1",
    "2": "1",
    "3": "2",
    "4": "2",
    "5": "3",
    "6": "3",
    "7": "4",
    "8": "4"
}

const dict = {
    "1": '1',
    "2": '2',
    "3": '3',
    "4": '4',
    "5": '5',
    "6": '6',
    "7": '7',
    "8": '8',
    "9": '9',
    "10": 'a',
    "11": 'b',
    "12": 'c',
    "13": 'd'
}
const publicPouch = [];
let remainPouch = [];
const buildPouch = () => {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            publicPouch.push({
                "id": `${i}${dict[j]}`,
                "tile": `<div id="${i}${dict[j]}" class="tile" style="background-image:url('../images/${rTC[i]}-0${dict[j]}.svg')"></div>`
            });
        }
    }
}
buildPouch();
const used = [];


const runBoard = ['@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@'];

const roots = [];
const getRoots = () => {
    let row = [1,3,5,7];
    let column = [2,3,4,5,6,7,8,9,10,11,12];
    for (let i = 0; i < 4; i++) {
        let rowI = Math.floor(Math.random()*row.length); 
        let columnI = Math.floor(Math.random()*column.length);
        roots.push({"set": "run","row": row[rowI], "column": column[columnI]});
        row.splice(rowI ,1); 
        column.splice(columnI - 1 ,3);
    }
    let row2 = [2,4];
    let column2 = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    for (let i = 0; i < 2; i++) {
        let row2I = Math.floor(Math.random()*row2.length); 
        let column2I = Math.floor(Math.random()*column2.length);
        roots.push({"set": "group","row": row2[row2I], "column": column2[column2I]});
        row2.splice(row2I ,1); 
        column.splice(column2I ,1);
    }
    for (let i = 0; i < roots.length; i++) {
        if (roots[i].set == "run" ) {
            used.push.apply(used, [`${roots[i].row}${dict[roots[i].column - 1]}`,`${roots[i].row}${dict[roots[i].column]}`,`${roots[i].row}${dict[roots[i].column + 1]}`]);
        } else {
            used.push.apply(used, [`2${dict[roots[i].column]}`,`4${dict[roots[i].column]}`,`6${dict[roots[i].column]}`]);
        }
    }
    
}
getRoots();
console.log("roots",roots);
console.log(publicPouch);
const filterUsed = () => {
    remainPouch = publicPouch.filter(function(item){
        return used.indexOf(item.id) == -1;
        // it doesn't exists in the used array === it hasn't been used
    })
    return remainPouch;
}



const $groups = $('.groups');
const $runs = $('.runs');
const generateRuns = (roots) => {
    runBoard.forEach( (string,row) => {
        const run = string.split('');
        $runs.append(`<div id="r${row +1}" class="run"></div>`);
        run.forEach( (tile,column) =>{
                if (column + 1 == 10) {
                    $(`#r${row + 1}`).append(`<div id="${row + 1}a" class="tile" ></div>`); 
                } else if (column + 1 == 11) {
                    $(`#r${row + 1}`).append(`<div id="${row + 1}b" class="tile" ></div>`);
                } else if (column + 1 == 12) {
                    $(`#r${row + 1}`).append(`<div id="${row + 1}c" class="tile" ></div>`);
                } else if (column + 1 == 13) {
                    $(`#r${row + 1}`).append(`<div id="${row + 1}d" class="tile" ></div>`);
                } else {
                    $(`#r${row +1}`).append(`<div id="${row + 1}${column +1}" class="tile" ></div>`);
                }
                if (row + 1 == 1 || row + 1 == 2) {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/1-0a.svg")`)
                        $(`#${row + 1}a`).addClass("hide");
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/1-0b.svg")`)
                        $(`#${row + 1}b`).addClass("hide");
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/1-0c.svg")`)
                        $(`#${row + 1}c`).addClass("hide");
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/1-0d.svg")`)
                        $(`#${row + 1}d`).addClass("hide");
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/1-0${column + 1}.svg")`)
                    $(`#${row + 1}${column + 1}`).addClass("hide");
                    }
                } else if (row + 1 == 3 || row + 1 == 4) {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/2-0a.svg")`)
                        $(`#${row + 1}a`).addClass("hide");
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/2-0b.svg")`)
                        $(`#${row + 1}b`).addClass("hide");
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/2-0c.svg")`)
                        $(`#${row + 1}c`).addClass("hide");
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/2-0d.svg")`)
                        $(`#${row + 1}d`).addClass("hide");
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/2-0${column + 1}.svg")`)
                    $(`#${row + 1}${column + 1}`).addClass("hide");
                    }
                } else if (row + 1 == 5 || row + 1 == 6) {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/3-0a.svg")`)
                        $(`#${row + 1}a`).addClass("hide");
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/3-0b.svg")`)
                        $(`#${row + 1}b`).addClass("hide");
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/3-0c.svg")`)
                        $(`#${row + 1}c`).addClass("hide");
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/3-0d.svg")`)
                        $(`#${row + 1}d`).addClass("hide");
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/3-0${column + 1}.svg")`)
                    $(`#${row + 1}${column + 1}`).addClass("hide");
                    }
                } else {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/4-0a.svg")`)
                        $(`#${row + 1}a`).addClass("hide");
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/4-0b.svg")`)
                        $(`#${row + 1}b`).addClass("hide");
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/4-0c.svg")`)
                        $(`#${row + 1}c`).addClass("hide");
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/4-0d.svg")`)
                        $(`#${row + 1}d`).addClass("hide");
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/4-0${column + 1}.svg")`)
                    $(`#${row + 1}${column + 1}`).addClass("hide");
                    }
                }
            
        })
    })
    for (let i = 0; i < 4; i++) {
        $(`#${roots[i].row}${dict[roots[i].column - 1]}`).removeClass("hide");
        $(`#${roots[i].row}${dict[roots[i].column]}`).removeClass("hide");
        $(`#${roots[i].row}${dict[roots[i].column + 1]}`).removeClass("hide");
    }
    console.log("runBoard", runBoard);
}

const generateGroups = (roots) => {
    for (let i = 1; i <= 2; i++) {
        if (roots[i+3].column >= 10) {
            $groups.append(`<div id="g${i}" class="group">
        <div class="tile" style="background-image:url('../images/1-0${dict[roots[i+3].column]}.svg')"></div>
        <div class="tile" style="background-image:url('../images/2-0${dict[roots[i+3].column]}.svg')"></div>
        <div class="tile" style="background-image:url('../images/3-0${dict[roots[i+3].column]}.svg')"></div>
        <div class="tile"></div>
    </div>`);
        } else {
            $groups.append(`<div id="g${i}" class="group">
        <div class="tile" style="background-image:url('../images/1-0${roots[i+3].column}.svg')"></div>
        <div class="tile" style="background-image:url('../images/2-0${roots[i+3].column}.svg')"></div>
        <div class="tile" style="background-image:url('../images/3-0${roots[i+3].column}.svg')"></div>
        <div class="tile"></div>
    </div>`)
        }
    }
    for (let i = 3; i <= 16; i++) {
        $groups.append(`<div id="g${i}" class="group">
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
    </div>`)
    }
    
}

const playerTile = [];
const computerTile = [];
let randomId = [];
const generatePlayersTile = () => {
    for (let i = 0; i < publicPouch.length; i++) {
        let index = Math.floor(Math.random()*publicPouch.length);
        let id = publicPouch[index].id;
        if (used.indexOf(id) == -1) {
            if (randomId.indexOf(id) == -1) {
                randomId.push(id);
                if (randomId.length === 28) {
                    for (let i = 0; i < randomId.length; i++) {
                        console.log(i);
                        if (i%2 === 0) {
                            computerTile.push(randomId[i]);
                            used.push(randomId[i]);
                        } else {
                            playerTile.push(randomId[i]);
                            used.push(randomId[i]);
                        } 
                    }
                    break;
                }
            } 
        }
        
        //check if the id exist in the used array, if not then 
        //check if the id exist in the random array, if not then push into random
        //when randomId array is 28 in length
        // deal cards to player and computer
        //break the loop
    }
    console.log('com', computerTile);
    console.log('player', playerTile);
    console.log('randomId', randomId);
}
//need solve = the player and computer is just getting the "id" of the tile not the whole object!

const generatePlayground = () =>{
    generateRuns(roots);
    generateGroups(roots);
    generatePlayersTile();
};
generatePlayground();
filterUsed();
console.log("publicPouch", publicPouch)
console.log("used",used.sort());
console.log("remainPouch", remainPouch);

