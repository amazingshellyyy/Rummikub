console.log("Hii It;s working!");

/* render the default tile in the playground */

let $black1Tiles = $("#black1 div");
let $black2Tiles = $("#black2 div");
// Array.arrayFrom($black1Tiles)
let $blue1Tiles = $("#blue1 div");
let $blue2Tiles = $("#blue2 div");
let $org1Tiles = $("#org1 div");
let $org2Tiles = $("#org2 div");
let $red1Tiles = $("#red1 div");
let $red2Tiles = $("#red2 div");
for (let i = 0; i < $black1Tiles.length; i++) {
    console.log(i);
    $black1Tiles.eq(i).css("background-image", `url("../images/1/1-0${i+1}.svg")`);
}
for (let i = 0; i < $black2Tiles.length; i++) {
    console.log(i);
    $black2Tiles.eq(i).css("background-image", `url("../images/1/1-0${i+1}.svg")`);
}

for (let i = 0; i < $blue1Tiles.length; i++) {
    console.log(i);
    $blue1Tiles.eq(i).css("background-image", `url("../images/2/2-0${i+1}.svg")`);
}
for (let i = 0; i < $blue2Tiles.length; i++) {
    console.log(i);
    $blue2Tiles.eq(i).css("background-image", `url("../images/2/2-0${i+1}.svg")`);
}
for (let i = 0; i < $org1Tiles.length; i++) {
    console.log(i);
    $org1Tiles.eq(i).css("background-image", `url("../images/3/3-0${i+1}.svg")`);
}
for (let i = 0; i < $org2Tiles.length; i++) {
    console.log(i);
    $org2Tiles.eq(i).css("background-image", `url("../images/3/3-0${i+1}.svg")`);
}
for (let i = 0; i < $red1Tiles.length; i++) {
    console.log(i);
    $red1Tiles.eq(i).css("background-image", `url("../images/4/4-0${i+1}.svg")`);
}
for (let i = 0; i < $red2Tiles.length; i++) {
    console.log(i);
    $red2Tiles.eq(i).css("background-image", `url("../images/4/4-0${i+1}.svg")`);
}




