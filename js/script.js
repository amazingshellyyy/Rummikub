

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
    "1": 1,
    "2": 1,
    "3": 2,
    "4": 2,
    "5": 3,
    "6": 3,
    "7": 4,
    "8": 4,
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
                "color": rTC[i],
                "number": `${dict[j]}`,
            });
        }
    }
}
buildPouch();
const used = [];

let runRoots = [];
let groupRoots = [];
const getRoots = () => {
    let roots = random(8);
    for (let i = 0; i < roots.length; i++) {
        if (roots[i][0] % 2 === 1 && cTI[roots[i][1]]>1 && cTI[roots[i][1]]<13 ) {
            runRoots.push(roots[i]);
        } else if (roots[i][0] === "4" || roots[i][0] === "6") {
            groupRoots.push(roots[i]);
            groupRoots.sort();
        }
        for (let j = 1; j < groupRoots.length; j++) {
            if (groupRoots[j][1] === groupRoots[j-1][1]) {
                groupRoots.splice(j-1,1);
            }
        }
        
    }
}
getRoots();
const filterUsed = () => {
    remainPouch = publicPouch.filter(function(item){
        return used.indexOf(item.id) == -1;
        // it doesn't exists in the used array === it hasn't been used
    })
    return remainPouch;
}
const filter = (item, arr) => {
        return arr.indexOf(item) == -1;  // it doesn't exists in the used array === it hasn't been used
    }
const $groups = $('.groups');
const $runs = $('.runs');

let runBoard = [];
const generateRuns = (runRoots) => {
    for (let i = 0; i < 8; i++) {
        runBoard.push('@@@@@@@@@@@@@');
    }
    for (let i = 0; i < runBoard.length; i++) {
        for (let j = 0; j < runRoots.length; j++) {
            runBoard[cTI[runRoots[j][0]]-1] = setCharAt(runBoard[cTI[runRoots[j][0]]-1],cTI[runRoots[j][1]]-2,dict[cTI[runRoots[j][1] ]-1]);
            runBoard[cTI[runRoots[j][0]]-1] = setCharAt(runBoard[cTI[runRoots[j][0]]-1],cTI[runRoots[j][1]]-1,dict[cTI[runRoots[j][1]]]);
            runBoard[cTI[runRoots[j][0]]-1] = setCharAt(runBoard[cTI[runRoots[j][0]]-1],cTI[runRoots[j][1]],dict[cTI[runRoots[j][1]]+1]);
        }
    }
    renderRunBoard(runBoard);
}

const renderRunBoard = (runBoard) => {
    for (let i = 0; i < runBoard.length; i++) {
        $runs.append(`<div id="r${i+1}" class="run"></div>`);
        for (let j = 0; j < runBoard[i].length; j++) {
            publicPouch.forEach(item => {
                if ( `${i+1}` === item.id[0] && dict[j+1] === item.number) {
                    $(`#r${i+1}`).append(`<div class="tile" style="background-image:url('../images/${rTC[i+1]}-0${dict[j+1]}.svg')"></div>`);
                }
            })
            if (runBoard[i][j] !== "@") {
                $(`#r${i+1} > div`).eq(j).addClass("highlight");
            }
        }
    }
}


let groupBoard = [];
const generateGroups = (groupRoots) => {
    for (let i = 0; i < groupRoots.length; i++) {
        let g = [];
        publicPouch.forEach(item => {
            if (item.id === groupRoots[i] || item.id === (parseInt(groupRoots[i][0])-2)+groupRoots[i][1] || item.id === (parseInt(groupRoots[i][0])+2)+groupRoots[i][1]) {
                g.push(item);
            }
        })
        groupBoard.push(g);
    }
    for (let i = 0; i < 16 - groupRoots.length; i++) {
        groupBoard.push([]);
    }
    for (let i = 0; i < groupBoard.length; i++) {
        for (let j = 0; j < groupBoard.length; j++) {
            if (groupBoard[i].length < 4) {
                groupBoard[i].push("@");
            }
        }
    }
    renderGroupBoard(groupBoard);
    return groupBoard;
}

const renderGroupBoard = (groupBoard) => {
    for (let i = 0; i < groupBoard.length; i++) {
        $groups.append(`<div id="g${i}" class="group"></div>`);
        for (let j = 0; j < 4; j++) {
            $(`#g${i}`).append(`<div class="tile"></div>`)
            if (groupBoard[i][j] !== "@") {
                $(`#g${i} > div`).eq(j).replaceWith(groupBoard[i][j].tile);
                $(`#g${i} > div`).addClass("highlight");
            }
        }
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
}
const generatePlayersTile = () => {
    let arr = random(28);
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

console.log('runsR', runRoots);
console.log('groupR', groupRoots);
console.log("publicPouch", publicPouch)
console.log("used",used.sort());
console.log("remainPouch", remainPouch);
console.log("runboard", runBoard);
console.log('groupBoard',groupBoard);


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
                let num = id.slice(1,2);
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