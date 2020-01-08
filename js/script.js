

/* render the default tile in the playground */
/* charToIndex */
const cTI = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
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
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
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

//random function
const random = (num) => {
    const randomId = [];
    for (let i = 0; i < publicPouch.length; i++) {
        let index = Math.floor(Math.random()*publicPouch.length);
        let id = publicPouch[index].id;
        if (used.indexOf(id) == -1) {
            if (randomId.indexOf(id) == -1) {
                randomId.push(id);
                if (randomId.length === num) {
                    for (let i = 0; i < randomId.length; i++) {
                        used.push(randomId[i]);
                    }
                    break;
                }
            } 
        }
    }
    return randomId;
}

const publicPouch = [];
let remainPouch = [];
const buildPouch = () => {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            publicPouch.push({
                "id": `${i}${dict[j]}`,
                "tile": `<div id="${i}${dict[j]}" class="tile" style="background-image:url('../images/${rTC[i]}-0${dict[j]}.svg')"></div>`,
                "color": `${rTC[i]}`,
                "number": `${dict[j]}`,
            });
        }
    }
}
buildPouch();
const used = [];


let runBoard = ['@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@','@@@@@@@@@@@@@'];

let runRoots = [];
let groupRoots = [];
let roots = [];
const getRoots = () => {
    /* let row = [1,3,5,7];
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
    } */
    let roots = random(10);
    for (let i = 0; i < roots.length; i++) {
        if (roots[i][0] % 2 === 1 && cTI[roots[i][1]]>1 && cTI[roots[i][1]]<13 ) {
            runRoots.push(roots[i]);
        } else if (roots[i][0] %2 === 0 || roots[i][0] === 2 || roots[i][0] === 4) {
            groupRoots.push(roots[i]);
        }
    }
    console.log("roots", roots);
    console.log('runsR', runRoots);
    console.log('groupR', groupRoots);
}
getRoots();
console.log("roots",roots);
const filterUsed = () => {
    remainPouch = publicPouch.filter(function(item){
        return used.indexOf(item.id) == -1;
        // it doesn't exists in the used array === it hasn't been used
    })
    return remainPouch;
}



const $groups = $('.groups');
const $runs = $('.runs');
const generateRuns = (runRoots) => {
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
                        $(`#${row + 1}a`).css("background-image", `url("../images/1-0a.svg")`);
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/1-0b.svg")`);
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/1-0c.svg")`);
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/1-0d.svg")`);
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/1-0${column + 1}.svg")`);
                    }
                } else if (row + 1 == 3 || row + 1 == 4) {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/2-0a.svg")`);
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/2-0b.svg")`);
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/2-0c.svg")`);
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/2-0d.svg")`);
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/2-0${column + 1}.svg")`);
                    }
                } else if (row + 1 == 5 || row + 1 == 6) {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/3-0a.svg")`);
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/3-0b.svg")`);
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/3-0c.svg")`);
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/3-0d.svg")`);
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/3-0${column + 1}.svg")`);
                    }
                } else {
                    if (column + 1 == 10) {
                        $(`#${row + 1}a`).css("background-image", `url("../images/4-0a.svg")`);
                    } else if (column + 1 == 11) {
                        $(`#${row + 1}b`).css("background-image", `url("../images/4-0b.svg")`);
                    } else if (column + 1 == 12) {
                        $(`#${row + 1}c`).css("background-image", `url("../images/4-0c.svg")`);
                    } else if (column + 1 == 13) {
                        $(`#${row + 1}d`).css("background-image", `url("../images/4-0d.svg")`);
                    } else {
                    $(`#${row + 1}${column + 1}`).css("background-image", `url("../images/4-0${column + 1}.svg")`);
                    }
                }
            
        })
    })
    
    for (let i = 0; i < runRoots.length; i++) {
        let r = runRoots[i][0];
        let c = runRoots[i][1];
        $(`#${r}${dict[cTI[c]- 1]}`).addClass("highlight");
        $(`#${r}${dict[cTI[c]]}`).addClass("highlight");
        $(`#${r}${dict[cTI[c]+ 1]}`).addClass("highlight");
        console.log("ctI",cTI[c]+1);
        console.log("idc", dict[cTI[c]+ 1]);
        runBoard[r-1] = setCharAt(runBoard[r-1],runRoots[i].column -2,dict[c - 1]);
        runBoard[r-1] = setCharAt(runBoard[r-1],runRoots[i].column -1,dict[c]);
        runBoard[r-1] = setCharAt(runBoard[r-1],runRoots[i].column,dict[c + 1]);
    }
}



let groupBoard = [];
const generateGroups = (groupRoots) => {
    for (let i = 1; i < groupRoots.length; i++) {
            $groups.append(`<div id="g${i}" class="group">
        <div class="tile highlight" style="background-image:url('../images/1-0${groupRoots[i][1]}.svg')"></div>
        <div class="tile highlight" style="background-image:url('../images/2-0${groupRoots[i][1]}.svg')"></div>
        <div class="tile highlight" style="background-image:url('../images/3-0${groupRoots[i][1]}.svg')"></div>
        <div class="tile"></div>
    </div>`)
    }
    for (let i = 0; i <= 16 - groupRoots.length; i++) {
        $groups.append(`<div id="g${i}" class="group">
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
    </div>`)
    }
}

let playerTile = [];
let computerTile = [];
const sortRack = (rack) => {
    rack.sort(function(x, y) {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    console.log('rack',rack);
}
const generatePlayersTile = () => {
    let arr = random(28);
    console.log("arr",arr);
    for (let i = 0; i < arr.length; i++) {
        if (i%2 === 0) {
            computerTile.push(arr[i]);
        } else {
            playerTile.push(arr[i]);
        } 
    }
    sortRack(playerTile);
}

//need solve = the player and computer is just getting the "id" of the tile not the whole object!
const $playerRack = $('.player-rack');
const showPlayerTile = (playerTile) => {
    for (let i = 0; i < playerTile.length; i++) {
        for (let j = 0; j < publicPouch.length; j++) {
            if (playerTile[i] === publicPouch[j].id) {
                $playerRack.append(`<div id="p${i}" class="tile highlight" style="background-image: url('../images/${publicPouch[j].color}-0${publicPouch[j].number}.svg');"></div>`)
            }
        }
        
    }
    
}
const generatePlayground = () =>{
    generateRuns(runRoots);
    generateGroups(groupRoots);
    generatePlayersTile();
    showPlayerTile(playerTile);
};
generatePlayground();
filterUsed();


console.log("publicPouch", publicPouch)
console.log("used",used.sort());
console.log("remainPouch", remainPouch);
console.log("runboard", runBoard);


/* Draw Card */
const $drawbtn = $('#draw');
const drawCard = () => {
    let id = random(1)[0];
    playerTile.push(id);
    playerTile.sort();
    renderDraw(id);
    filterUsed();
    updateTileCount();
}
$drawbtn.on('click', function(){
    drawCard();
    sortRack(playerTile);
//render the update array
});

const renderDraw = (id) => {
        publicPouch.forEach(item => {
            if(item.id === id){
                let color = rTC[id.slice(0,1)];
                console.log(color);//get string ID of the tile
                let num = id.slice(1,2);
                console.log(num);//get string ID of the tile
                let preid = parseInt($('.player-rack div:last-child').attr("id").slice(1,3));
                $playerRack.append(`<div id="p${preid + 1}" class="tile highlight" style="background-image: url('../images/${color}-0${num}.svg');"></div>`)
            }
        })
        
}

const updateTileCount = () => {
    $('#p-tile-count').text(`x${playerTile.length}`);
    $('#c-tile-count').text(`x${computerTile.length}`);
    $('#public-pouch').text(`x${remainPouch.length}`);
}


// const done = (runboard) => {
//     if ( playerTile.length === 0 || computerTile.length === 0) {
//         //anouncewinner();
//     } else {
//         if (playerTile) {
            
//         }
//     }
// 1. check if the rack is empty
//     1. yes, announce winner
//     2. no, check valid
// 2. check valid
//     1. check user tile count
//         1. less then previous, next turn
//         2. no change, draw a tile
// }
// let screenShot = {
//     "remainPouch": "",
//     "used": "",
//     ""
// }
// const reverse = () => {

// }