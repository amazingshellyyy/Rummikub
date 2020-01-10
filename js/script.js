
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
const setCharAt = (str,index,chr) =>{
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

/* random function */
const random = (num) => {
    const randomId = [];
    for (let i = 0; i < publicPouch.length; i++) {
        let index = Math.floor(Math.random()*publicPouch.length);
        let id = publicPouch[index].id;
        if (used.indexOf(id) == -1) {
            if (randomId.indexOf(id) == -1) {
                randomId.push(id);
                if (randomId.length === num) {
                    // for (let i = 0; i < randomId.length; i++) {
                    //     used.push(randomId[i]);
                    // }
                    break;
                }
            } 
        }
    }
    return randomId;
}

/* buildPouch */
const publicPouch = [];
let remainPouch = [];
const buildPouch = () => {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            if (i%2 === 1) {
                publicPouch.push({
                    "id": `${i}${dict[j]}`,
                    "tile": `<div id="${i}${dict[j]}" class="tile" style="background-image:url('../images/${rTC[i]}-0${dict[j]}.svg')" location="${i}${dict[j]} ${i+1}${dict[j]}" color="${rTC[i]}" number="${dict[j]}"></div>`,
                    "color": rTC[i],
                    "number": `${dict[j]}`,
                    "location": `${i}${dict[j]} ${i+1}${dict[j]}`
                });
            } else {
                publicPouch.push({
                    "id": `${i}${dict[j]}`,
                    "tile": `<div id="${i}${dict[j]}" class="tile" style="background-image:url('../images/${rTC[i]}-0${dict[j]}.svg')" location="${i}${dict[j]} ${i-1}${dict[j]}" color="${rTC[i]}" number="${dict[j]}"></div>`,
                    "color": rTC[i],
                    "number": `${dict[j]}`,
                    "location": `${i}${dict[j]} ${i-1}${dict[j]}`
                });
            }
        }
    }
}
buildPouch();
const used = [];

const screenShot = {
    "computerTile": [],//strings in array. ["","",""]
    "playerTile": [],//strings in array. ["","",""]
    "runBoard": [],//strings in array. ["","",""]
    "groupBoard": [],//Object or "@" in array and in. [[{},{},{},"@"],[{}{},{}],[@,@,@,@]]
    "used": [],//string in array. ["","","",""]
    "remainPouch": [],////string in array. ["","","",""]
}


let runRoots = [];
let groupRoots = [];
const getRoots = () => {
    let roots = random(8);
    console.log("roots", roots);
    for (let i = 0; i < roots.length; i++) {
        if (roots[i][0] % 2 === 1 && cTI[roots[i][1]]>1 && cTI[roots[i][1]]<13 ) {
            runRoots.push(roots[i]);
        } else if (roots[i][0] === "4" || roots[i][0] === "6") {
            groupRoots.push(roots[i]);
            groupRoots.sort();
        } else {
                if (used.indexOf(roots[i]) !== -1) {
                    let index = used.indexOf(roots[i]);
                    used.splice(index,1);
                }
            
        }
        for (let j = 1; j < groupRoots.length; j++) {
            if (groupRoots[j][1] === groupRoots[j-1][1]) {
                groupRoots.splice(j-1,1);
            }
        }

        //push to used and recover from used

        
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
    $('.runs > div').remove();
    for (let i = 0; i < runBoard.length; i++) {
        $runs.append(`<div id="r${i+1}" class="run"></div>`);
        for (let j = 0; j < runBoard[i].length; j++) {
            publicPouch.forEach(item => {
                if ( `${i+1}` === item.id[0] && dict[j+1] === item.number) {
                    $(`#r${i+1}`).append(item.tile);
                }
            })
            if (runBoard[i][j] !== "@") {
                $(`#r${i+1} > div`).eq(j).addClass("highlight");
                used.push(`${i+1}${dict[j+1]}`);
            }
            if (runBoard[i][j] === "@") {
                $(`#r${i+1} > div`).eq(j).addClass("greyout").removeAttr('id');

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
    $('.groups > div').remove();
    for (let i = 0; i < groupBoard.length; i++) {
        $groups.append(`<div id="g${i}" class="group"></div>`);
        for (let j = 0; j < 4; j++) {
            $(`#g${i}`).append(`<div class="tile faceback" gIndex="${i}" eIndex="${j}"></div>`);
            if (groupBoard[i][j] !== "@") {
                $(`#g${i} > div`).eq(j).replaceWith(groupBoard[i][j].tile)
                $(`#g${i} > div`).eq(j).attr('gIndex',`${i}`).attr('eIndex',`${j}`);
                $(`#g${i} > div`).eq(j).addClass("highlight");
                used.push(`${groupBoard[i][j].id}`);
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
const dealCards = () => {
    let arr = random(28);
    
    for (let i = 0; i < arr.length; i++) {
        used.push(`${arr[i]}`);
        if (i%2 === 0) {
            computerTile.push(arr[i]);
        } else {
            playerTile.push(arr[i]);
        } 
    }
    sortRack(playerTile);
    sortRack(computerTile)
}

//need solve = the player and computer is just getting the "id" of the tile not the whole object!
const $playerRack = $('.player-rack');
const renderPlayerTile = (playerTile) => {
    $('.player-rack > div').remove();
    for (let i = 0; i < playerTile.length; i++) {
        for (let j = 0; j < publicPouch.length; j++) {
            if (playerTile[i] === publicPouch[j].id) {
                $playerRack.append(publicPouch[j].tile);
                $('.player-rack > div').addClass("highlight");
            }
        }
    }
    
    return playerTile;
}
const generatePlayground = () =>{
    generateRuns(runRoots);
    generateGroups(groupRoots);
    dealCards();
    renderPlayerTile(playerTile);
};
generatePlayground();
filterUsed();




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
    console.log("playerTile", playerTile);
    console.log("drawUsed", used);
    console.log("remain", remainPouch.sort());
//render the update array
});

const renderDraw = (id) => {
        publicPouch.forEach(item => {
            if(item.id === id){
                let color = rTC[id.slice(0,1)];
                let num = id.slice(1,2);
                let preid = parseInt($('.player-rack div:last-child').attr("id").slice(1,3));
                $playerRack.append(item.tile);
                $('.player-rack > div').addClass("highlight");
                used.push(item.id);
            }
        })
        makeTileDraggable();
        
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

const snap = () => {
    deepClone(screenShot.computerTile, computerTile);
    deepClone(screenShot.playerTile, playerTile);
    deepClone(screenShot.runBoard, runBoard);
    deepClone(screenShot.groupBoard, groupBoard);
    deepClone(screenShot.used, used);
    deepClone(screenShot.remainPouch, remainPouch);
}

const cleanUp =(object) => {
    for (const key in object) {
        object[key] = [];
    }
}


const deepClone = (target,arr) => {
    for (let i = 0; i < arr.length; i++) {
        target.push(arr[i]);
    }
}

const reverse = () => {
    deepClone(computerTile,screenShot.computerTile);
    deepClone(playerTile,screenShot.playerTile);
    deepClone(runBoard,screenShot.runBoard);
    deepClone(groupBoard,screenShot.groupBoard);
    deepClone(used,screenShot.used);
    deepClone(remainPouch,screenShot.remainPouch);
    renderGroupBoard(groupBoard);
    renderRunBoard(runBoard);
    updateTileCount();
}

$('.reverse').on('click',reverse);


console.log('runsR', runRoots);
console.log('groupR', groupRoots);
console.log("publicPouch", publicPouch)
console.log("used",used.sort());
console.log("remainPouch", remainPouch);
console.log("runBoard", runBoard);
console.log("computerTile", computerTile);
console.log("playerTile", playerTile);
console.log('groupBoard',groupBoard);
//test for screenshot and cleanup
/* snap();
console.log("screenShot",screenShot);
cleanUp(screenShot);
console.log("screenShot-AfterCleanUp",screenShot); */

//test for rendering
/* runBoard[7] = setCharAt(runBoard[7],3,"3");
console.log("runBoard",runBoard);
renderRunBoard(runBoard);

groupBoard[0][0] = remainPouch[9];
console.log("groupBoard", groupBoard);
renderGroupBoard(groupBoard); 

playerTile.shift();
console.log("playerTile",playerTile);
renderPlayerTile(playerTile); */
let draggingDiv = {};
let draggingDivParent = {};
let droppingPlace = {};
let droppingGroup = {};
let draggingLo = "";
let droppingLo = "";
let color1 = "";
let number1 = "";
let color2 = "";
let number2 = "";
let id1 = "";
let id2 = "";
let droppingGIndex = "";
let droppingEIndex = "";
let draggingGIndex = "";
let draggingEIndex = "";


const makeTileDraggable =() => {
    console.log('makeTileDraggable');
    $('.tile.highlight').draggable({
        // revert: invalidHolder,
    });
    $('.tile').on('drag', function() {
        draggingDiv = $(this);
        // console.log("draggingDiv",draggingDiv);
        // console.log("onDrag");
        color1 = $(this).attr('color');
        console.log("color1",color1);
        console.log("number1",number1);
        number1 = $(this).attr('number');
        id1 = $(this).attr('id');
        // console.log("id1",id1);
        draggingLo = $(this).attr("location");
        // console.log("draggingLo",draggingLo);
        draggingDivParent = $(this).parents('.player-rack');
        // console.log('draggingDivParent',draggingDivParent);
        // console.log($('.player-rack'));
        draggingGIndex = $(this).attr('gIndex');
        draggingEIndex = $(this).attr('eIndex');
    })
    
    $('.player-rack > div').on('dragstop',function() {
        // if (!invalidHolder()) {
            console.log('updateplayerrackworking');
            console.log("playerTileBefore",playerTile);
            let index = playerTile.indexOf(`${id1}`);
            if (index !== -1) {
                console.log("id1 in updateplayer",id1);
                console.log('index',index);
                playerTile.splice(index,1);
                console.log("playerTileAfterSplice",playerTile);
                renderPlayerTile(playerTile);
                makeTileDraggable();
                updateTileCount();
            }
            /* if have "12" and "22", drop "12" on row1 column2, and drop "22" on row1 column2 will cause the tile disappear*/
        // }

    })
    
    
}
const makeTileDroppable = () => {
    console.log('makeTileDroppable');
    $('.greyout').droppable({
        drop: updatePlayGround
    });
    $('.tile.greyout').on('drop', function() {
        droppingPlace = $(this);
        console.log("droppingPlace",droppingPlace);
        color2 = $(this).attr('color');
        console.log("color2",color2);
        number2 = $(this).attr('number');
        console.log("number2", number2);
        id2 = $(this).attr("location").split(' ')[0];
        droppingLo = $(this).attr("location");
        // console.log("droppingLo", droppingLo);
    })
    
    $('.tile.faceback').droppable({
        drop: updatePlayGround
    })
    $('.tile.faceback').on('drop', function(){
        droppingGroup = $(this);
        console.log(droppingGroup);
        droppingGIndex = $(this).attr('gIndex');
        droppingEIndex = $(this).attr('eIndex');
    })
    
}

const updateGroupBoard = () => {
    console.log("updateGroupBoardworking!");
    console.log('id1',id1);
    console.log('gIndexDragging', draggingGIndex);
    console.log('eIndexDragging', draggingEIndex);
    console.log('gIndexDropping', droppingGIndex);
    console.log('eIndexDropping', droppingEIndex);
    // console.log(publicPouch);
    console.log(groupBoard[parseInt(droppingGIndex)]);
    console.log(groupBoard[parseInt(droppingGIndex)][parseInt(droppingEIndex)]);
    publicPouch.forEach(item => {
        if (id1 === item.id) {
            groupBoard[parseInt(droppingGIndex)][parseInt(droppingEIndex)] = item;
        }
    })
    if (!!draggingGIndex) {
        groupBoard[parseInt(draggingGIndex)][parseInt(draggingEIndex)] = "@";
    } 
    // if (condition) {
        
    // }
    // updateRunboard();
    // renderRunBoard(runBoard);
    
    console.log("updatedGroupboard", groupBoard);
}



const invalidHolder = () => {
    console.log('invalidHolder');
    console.log('color2',color2);
    console.log('number2',number2);
    if ( color1 !== color2 || number1 !== number2) {
        console.log('It is true!');
        return true;
    }
}

// $playerTile = $('.player-rack > div');
// $runBoardHolder = $('.runs > .run > div');
const updateRunboard =() => {
    console.log('updating runboard');

    if (!invalidHolder()) {
        //updateRunBoard
        console.log('updateRunboard!');
        let draggingIndex = parseInt(id1[0])-1;
        let droppingIndex = parseInt(id2[0])-1;
        let numToupdate = number1;
        let different = droppingLo.indexOf(id1) - droppingLo.indexOf(id2);
        let same = droppingLo.indexOf(id2) - droppingLo.indexOf(id1);
        console.log("draggingIndex", draggingIndex);
        console.log("number1",cTI[number1]-1);
        console.log("droppingIndex", droppingIndex);
        console.log("number2",cTI[number2]-1);
        console.log("numToupdate", numToupdate);
        if( different === 3 ) {
            console.log("getInDifferent!");
            if (draggingIndex < droppingIndex) {
                console.log("draggingIndex < droppingIndex")
                runBoard[droppingIndex] = setCharAt(runBoard[droppingIndex],cTI[number2]-1, numToupdate);
                runBoard[draggingIndex] = setCharAt(runBoard[draggingIndex],cTI[number1]-1,"@");
            } else {    
                runBoard[droppingIndex] = setCharAt(runBoard[droppingIndex],cTI[number2]-1, numToupdate);
                // runBoard[draggingIndex] = setCharAt(runBoard[draggingIndex],cTI[number1]-1,"@");
            } 
        } else if (same === 0) {
            console.log("getInsame!");
            if (draggingIndex === droppingIndex) {
                console.log("draggingIndex < droppingIndex")
                runBoard[droppingIndex] = setCharAt(runBoard[droppingIndex],cTI[number2]-1, numToupdate);
            } 
        }
        console.log("updateRunboard",runBoard);
        console.log("updateGroupboard",groupBoard);
    } 

    //from
    if (!draggingGIndex && !draggingEIndex) {
        console.log(runBoard);
        let draggingIndex = parseInt(id1[0])-1;
        let droppingIndex = parseInt(id2[0])-1;
        let numToupdate = number1;
        console.log("draggingIndex", draggingIndex);
        console.log("number1",cTI[number1]-1);
        console.log("droppingIndex", droppingIndex);
        console.log("number2",cTI[number2]-1);
        console.log("numToupdate", numToupdate);
        runBoard[draggingIndex] = setCharAt(runBoard[draggingIndex],cTI[number1]-1, "@");
    }

    
}

const updatePlayGround = () => {
    updateRunboard();
    updateGroupBoard();
    renderRunBoard(runBoard);
    renderGroupBoard(groupBoard);
    makeTileDraggable();
    makeTileDroppable();
}

makeTileDraggable();
makeTileDroppable();

console.log(runBoard);


const DoneValidation = () => {

    //check runboard
    let checkArr = [];
    const regex = /\w+/g;
    for (let i = 0; i < runBoard.length; i++) {
        let run = runBoard[i].match(regex);
        if (run !== null) {
            checkArr.push(run);
        }
    }
    
    // checkArr.forEach(el => {
    //     for (let i = 0; i < el.length; i++) {
    //         console.log(el[i]);
    //         if (el[i].length <3) {
    //             console.log('runBoard failed, reverse!')
    //             return false;
    //         }
    //     }
    // })
    for (let i = 0; i < checkArr.length; i++) {
        for (let j = 0; j < checkArr[i].length; j++) {
            console.log(checkArr[i][j]);
            if (checkArr[i][j].length <3) {
                console.log('runBoard failed, reverse!')
                return false;
            }
        }
    }
    
    console.log('checkArr',checkArr);
    console.log('runBoard pass the test!')

    //check groupboard
   let groupArr =[];
    console.log('groupboard', groupBoard);
    for (let i = 0; i < groupBoard.length; i++) {
        //check the length
        let innerArr = [];
        for (let j = 0; j < groupBoard[i].length; j++) {
            if (typeof groupBoard[i][j] === "object") {
                innerArr.push(groupBoard[i][j]);
            }
        }
        if (innerArr.length < 3 && innerArr.length > 0) {
            console.log('groupboard failed at length!')
            return false;
        } 
        //check the number, should be the dame
        for (let j = 0; j < innerArr.length -1; j++) {
            let el1n = innerArr[j].number;
            let el2n = innerArr[j+1].number;

            if (el1n !== el2n) {
                console.log('groupboard failed at number!')
                return false;
            }
        }
        
        //check the color
        let color = ["1","2","3","4"];
        for (let j = 0; j < innerArr.length; j++) {
            console.log("color",color);
            console.log("innerArr",innerArr);
            let elc = `${innerArr[j].color}`;
            if (color.indexOf(elc) !== -1) {
                let index = color.indexOf(elc);
                console.log("colorBefore",color);
                color.splice(index ,0);
                console.log("colorAfter",color);
            } else {
                console.log('groupboard failed at color!')
                return false;
            }
        }
    }

    console.log(groupArr);
    console.log('groupboard pass the test!');
    return true;
}


$('.done').on('click',DoneValidation);