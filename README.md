# Project #0: Rummikub

![samplePic](https://i.imgur.com/vzUVt6W.png)

### Overview

**Rummikub** is a tile-based game for 2 to 4 players, combining elements of the card game rummy and mahjong. There are 104 number tiles in the game (valued 1 to 13 in four different colors, two copies of each) and two jokers. Players have 14 tiles initially and take turns putting down tiles from their racks into sets (groups or runs) of at least three, drawing a tile if they cannot play. The first player to use all their tiles scores a positive score based on the total of the other players' hands, while the losers get negative scores. An important feature of the game is that players can work with the tiles that have already been played.

resource: https://en.wikipedia.org/wiki/Rummikub

---
### Initial Setting
1.Player can see the slide show for tutorial of the game or click "start" to enter the game.
2.On the screen, there will be two tiles facing down. Player will choose either one and the other one represent computer's choice. Whichever is bigger will go first.
![Choose bigger](https://i.imgur.com/CrsunAW.png)
3.System will deal 14 cards from the public pouch for both player and computer.

---
### Contents
106 tiles (2 sets of tiles numbered 1 to 13 in four colors: black, red, blue, orange; 2 Jokers)
![Rummikub tiles](https://i.imgur.com/TWljTkC.png)


---
### Basic Rule/ Logic

A valid set must be at least 3 tiles.

**A group: same number but different color** (3 or maximun of 4 cards)

**A run: same color of consecutive number** (3 or more)

![RunGroup](https://i.imgur.com/MlcEAOS.png)

players will take turn to put tiles in the playground.
player can build on the sets in the playground.
All the tile sets on the playground must be valid.


---
### The Jokers
![Jokers](https://i.imgur.com/UuJqcL2.png)

joker card can represent any number in any color.

once the joker is in the playground, anyone can use it by replacing it if all the set are still valid before their turn ends. player must use the joker at that turn.


---
### Start the Game
**First turn must break the ice. Players must show more than 30 points at their first turn**
After breaking the ice, player take turns. if no tile is added to the playground, the player must draw one tile from the public pouch.

**Every turn**
If add any tile to the playground, no need to draw new tile and the turn is done.
If didn't add any tile to the playgorund, draw one tile.

---
### To win
whoever **empty their rack** first wins. and the total points of the tiles in the losers rack will be the points winner wins and the points loser loses.

Play 3 rounds and calculate final score.



---
## Functions


### Monday

HTML structure

make the grid and make sure the grid can render given tile image

#### Initial playground

3 valid groups and 4 valid runs will be generate automatically

#### Deal - 14 tiles each for Both

Use random() to the pouch array and distribute to player and computer array

sort the player and computer array

#### Draw - add tile to user**

random() from pouch and add to player

In player's rack, sort by number(1 ~13) then by color(Black, Blue, Orange, Red)

---

### Tuesday

#### Done - end of each turn**

1. check if the rack is empty
    1. yes, announce winner
    2. no, check valid
2. check valid
    1. check user tile count
        1. less then previous, next turn
        2. no change, draw a tile

#### Arrange

"Pick one, Drop one"

For **Runs, will check if the tile is at its designed place**

For **Groups, will check when click the "Done" button( see validation)**

#### Reverse - back to previous stage

use Object to store previous value(when computer click "Done").

reassign value to current

---

### Wednesday

#### Computer

1. check if any complete **Runs** or **Groups** on rack
2. check if can add on tiles in the playground - For Loop
3. If not, draw one tile from the pouch

#### Score

sum the value of the tile on the losers rack

#### Stretch goals

---

### Thursday

CSS

/animation

## Stretch goals

1. timer: each turn have only 2 minutes.
2. sorting function: help player rearrange their card by runs or group
3. Joker
4. Drag and drop (jquery)
5. Better and more efficient way for computer

