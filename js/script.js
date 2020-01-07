console.log("Hii It;s working!");

/* render the default tile in the playground */

let $black1Tiles = $("#black1 div");
let $black2Tiles = $("#black2 div");
let $blue1Tiles = $("#blue1 div");
let $blue2Tiles = $("#blue2 div");
let $org1Tiles = $("#org1 div");
let $org2Tiles = $("#org2 div");
let $red1Tiles = $("#red1 div");
let $red2Tiles = $("#red2 div");
const publicPouch = [];
for (let i = 0; i < $black1Tiles.length; i++) {
    $black1Tiles.eq(i).css("background-image", `url("../images/1/1-0${i+1}.svg")`);
    publicPouch.push($black1Tiles.eq(i));
}
for (let i = 0; i < $black2Tiles.length; i++) {
    $black2Tiles.eq(i).css("background-image", `url("../images/1/1-0${i+1}.svg")`);
    publicPouch.push($black2Tiles.eq(i));
}

for (let i = 0; i < $blue1Tiles.length; i++) {
    $blue1Tiles.eq(i).css("background-image", `url("../images/2/2-0${i+1}.svg")`);
    publicPouch.push($blue1Tiles.eq(i));
}
for (let i = 0; i < $blue2Tiles.length; i++) {
    $blue2Tiles.eq(i).css("background-image", `url("../images/2/2-0${i+1}.svg")`);
    publicPouch.push($blue2Tiles.eq(i));
}
for (let i = 0; i < $org1Tiles.length; i++) {
    $org1Tiles.eq(i).css("background-image", `url("../images/3/3-0${i+1}.svg")`);
    publicPouch.push($org1Tiles.eq(i));
}
for (let i = 0; i < $org2Tiles.length; i++) {
    $org2Tiles.eq(i).css("background-image", `url("../images/3/3-0${i+1}.svg")`);
    publicPouch.push($org2Tiles.eq(i));
}
for (let i = 0; i < $red1Tiles.length; i++) {
    $red1Tiles.eq(i).css("background-image", `url("../images/4/4-0${i+1}.svg")`);
    publicPouch.push($red1Tiles.eq(i));
}
for (let i = 0; i < $red2Tiles.length; i++) {
    $red2Tiles.eq(i).css("background-image", `url("../images/4/4-0${i+1}.svg")`);
    publicPouch.push($red2Tiles.eq(i));
}

console.log("public",publicPouch);
let roots = [];
const generatePlayground = () =>{
   
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random()*publicPouch.length) +1;
        roots.push(publicPouch[index]);
        publicPouch.splice(index,1);
    }
    generateGroups(roots);
    generateRuns(roots);
};

let $groups = $('.groups');
let $runs = $('.runs');
console.log(roots);
const generateGroups = (roots) => {
    for (let i = 1; i <= 2; i++) {
        $groups.append(`<div id="g${i}" class="group">
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
    </div>`)
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
const generateRuns = (roots) => {
    for (let i = 1; i <= 8; i++) {
        $runs.append(`<div id="r${i}" class="run"><div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div><div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div><div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div><div class="tile"></div></div>`);
    
    }
}


generatePlayground();
/* Player tile */
/* let $playerTile = $('.player-rack div');
let playerTile = [];
for (let i = 0; i < $playerTile.length; i++) {
    playerTile.push($playerTile.eq(i));
    
}
console.log(playerTile);
// Math.floor(Math.random*publicPouch.length);
$playerTile.eq(3).css("background-image", `url("../images/4/4-011.svg")`); */