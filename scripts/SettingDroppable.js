"use strict"
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//this array was taken from your website
var ScrabbleTiles = [];
ScrabbleTiles["A"] = {"value": 1, "original-distribution": 9, "number-remaining": 9};
ScrabbleTiles["B"] = {"value": 3, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["C"] = {"value": 3, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["D"] = {"value": 2, "original-distribution": 4, "number-remaining": 4};
ScrabbleTiles["E"] = {"value": 1, "original-distribution": 12, "number-remaining": 12};
ScrabbleTiles["F"] = {"value": 4, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["G"] = {"value": 2, "original-distribution": 3, "number-remaining": 3};
ScrabbleTiles["H"] = {"value": 4, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["I"] = {"value": 1, "original-distribution": 9, "number-remaining": 9};
ScrabbleTiles["J"] = {"value": 8, "original-distribution": 1, "number-remaining": 1};
ScrabbleTiles["K"] = {"value": 5, "original-distribution": 1, "number-remaining": 1};
ScrabbleTiles["L"] = {"value": 1, "original-distribution": 4, "number-remaining": 4};
ScrabbleTiles["M"] = {"value": 3, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["N"] = {"value": 1, "original-distribution": 6, "number-remaining": 6};
ScrabbleTiles["O"] = {"value": 1, "original-distribution": 8, "number-remaining": 8};
ScrabbleTiles["P"] = {"value": 3, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["Q"] = {"value": 10, "original-distribution": 1, "number-remaining": 1};
ScrabbleTiles["R"] = {"value": 1, "original-distribution": 6, "number-remaining": 6};
ScrabbleTiles["S"] = {"value": 1, "original-distribution": 4, "number-remaining": 4};
ScrabbleTiles["T"] = {"value": 1, "original-distribution": 6, "number-remaining": 6};
ScrabbleTiles["U"] = {"value": 1, "original-distribution": 4, "number-remaining": 4};
ScrabbleTiles["V"] = {"value": 4, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["W"] = {"value": 4, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["X"] = {"value": 8, "original-distribution": 1, "number-remaining": 1};
ScrabbleTiles["Y"] = {"value": 4, "original-distribution": 2, "number-remaining": 2};
ScrabbleTiles["Z"] = {"value": 10, "original-distribution": 1, "number-remaining": 1};
ScrabbleTiles["_"] = {"value": 0, "original-distribution": 2, "number-remaining": 2};

// the number of tiles will decrease everytime the user, click the "New Had" button
var totalTiles = 100;

// This is the array for the player's hand
var newHand = [];


var original = $.extend({}, ScrabbleTiles);

//this was also taken. From Jason on Piazza
var dict = {};


$(document).ready(function () {
    //everytime the page loads, it will call this main function, which sets up everything
    SetUp();
});
//this was also taken. From stackOverflow
//it allows me to use "String.format()"
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
        });
    };
}

function SetUp() {
    //this function fills the "newHand" array with random letter from the original array
    getRandomLetters();
    //this sets up the structure of the page
    setUpTable();
    //goes through all the div with id that starts with droppable and set them to droppable 
    setDroppable();
    //same logic as above
    setDraggable();
    //builds the table that tells the player how many tiles are left    
    buildInfoTable();
}
function setUpTable() {

    var backgroundImage = "";
    var divStructure = "<div id='droppable{0}' class='ui-widget-header {1}'></div>"
    var divResult = "";
    
    //normal tiles will have grey background
    //tiles 0, 3, 7, 11, and 14 are special and will either have double or triple
    for (var col = 0; col < 15; col++) {
        backgroundImage = "normalTile";       
        if (col === 0 || col === 7 || col === 14)
            backgroundImage = "tripleTile";
        if (col === 3 || col === 11)
            backgroundImage = "doubleTile";
        
        //this structure will build all the divs for all the droppable and "col" will be their ids
        divResult += String.format(divStructure, col, backgroundImage);
    }
    $("#containerDroppable").html(divResult);


    //this chunk of code has the same logic as above
    divStructure = "<div id='draggable{0}' class='piece ui-widget-content'>{1}</div>"
    divResult = "";
    for (var col = 0; col < 7; col++) {
        divResult += String.format(divStructure, col, newHand[col]);
    }
    $("#containerDraggable").html(divResult);
}

function setDroppable() {
    $(function () {
        //look for any element with the id that starts with "droppable" and set them all to droppable sing jquery ui
        $("[id^=droppable]").droppable({
            drop: function (event, ui) {
                $(this).addClass("ui-state-highlight");
                updateInfo(ui);
               
            }
        });
    });
}

function updateInfo(ui){
    var tileInfo = ui.draggable.text(); //the info of the tile that is being dragged
    var letter = tileInfo.split(",")[0]; //the letter, this will be used to add to the currentword
    var score = parseInt(tileInfo.split(",")[1]); //the score, same as above
    
    var currentWord = $("#word").text(); //currentword, i dont know what else to say about this, the variable name is pretty much self-explanatory
    var currentScore = ($("#score").text() === "") ? 0:parseInt($("#score").text()); //same
    
    $("#word").text(currentWord + letter); //add the word
    $("#score").text(parseInt(currentScore) + parseInt(score)); // add the score
                
}

function setDraggable() {
    //look for any element that has id that starts with draggable that set that female-dog to a draggable using jqueryui
    $(function () {
        $("[id^=draggable]").draggable();
    });
}

function getRandomLetters() {
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    newHand = []; // this global array has to be cleared everytime because we want a new set of tiles
    
    //the tiles only reset if the number of total tiles is less than 7
    if (totalTiles > 7) {
        for (var i = 0; i < 7; i++) {
            text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            if (ScrabbleTiles[text]["number-remaining"] === 0) {
                i--;
                continue;
            }
            else {
                newHand[i] = String.format("{0},{1}", text, ScrabbleTiles[text].value);
                ScrabbleTiles[text]["number-remaining"]--;
                totalTiles--;
            }
        }
    } else{ //if totaltiles (tiles remaining) is less than 7, then resets
        ScrabbleTiles = original.slice();
        totalTiles = 100;
        //this has the same logic except for the fact that we have to original array to its original value
        // then, just set totalTile to 100
        for (var i = 0; i < 7; i++) {
            text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            if (ScrabbleTiles[text]["number-remaining"] === 0) {
                i--;
                continue;
            }
            else {
                newHand[i] = String.format("{0},{1}", text, ScrabbleTiles[text].value);
                ScrabbleTiles[text]["number-remaining"]--;
                totalTiles--;
            }
            
            //need to alert the user about tiles refilling;
        }
    }
    
    //finally, find the label representing the totaltiles and set its value to 100;
    $("#tileTotal").text(totalTiles);

}

function buildInfoTable() {
    var table = "";
    var rows = "";
    var columns = "";
    
    //these three structures allow for the use of String.format
    //their values never change
    var tableStructure = "<table>{0}</table>";
    var rowStructure = "<tr>{0}</tr>";
    var colStructure = "<td>{0}</td>";

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var letter = ""; //used for putting the letter in the table

    for (var i = 0; i < alphabet.length; i++) {
        letter = alphabet.charAt(i);//we aget the char at the ith position and build the columns and rows as i is increasing

        columns += String.format(colStructure, letter); //build letter column
        columns += String.format(colStructure, ScrabbleTiles[letter]["number-remaining"]); //build the remaining piece column

        rows += String.format(rowStructure, columns); // take the columns and put them in a row
        columns = ""; // clear the column so that we can use it in the next loop
    }

    // finally, put all the rows inside the table
    table = String.format(tableStructure, rows);

    //find the div and set its content to the newly built table
    $("#infoTable").html(table);
}

// this function responds to the event when the "submit word" button is clicked
function submitAndUpdate(){
    var word = $("#word").text().toLowerCase(); // get the word from the label 
    if(findWord(word) !== "") //check if it exists in the dictionary
        $("#result").text(word + " is a word").attr("style", "color: lime"); // if it exists in there, then tell the user so. and set the thing to green
    else
        $("#result").text(word + " is a not word").attr("style", "color: red"); // else tell them to try a new word
}


///////////////////Stolen code region//////////////////////
//taken from Jason on Piazza
 
// Do a jQuery Ajax request for the text dictionary
$.get( "tiles/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
//    var count = 0;
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }
//    console.log(words[0]+"|" +dict[words[0]]+"|"+dict["a"]);
//    console.log(typeof(words[0]) +"|"+ typeof("a"));
//    console.log(words[0] === "a");
});
 
// Modified to only pass in one word, which can then be verified.

function findWord( word ) {
    // See if it's in the dictionary
//    console.log(dict[word]);
    if ( dict[ word ] ) {
        // If it is, return that word
        return word;
    }

    // Otherwise, it isn't in the dictionary.
    return "";
}

///////////////End stolen code region////////////////////