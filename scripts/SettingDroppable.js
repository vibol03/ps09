/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

var totalTiles = 100;
var newHand = [];
var original = $.extend({}, ScrabbleTiles);

$(document).ready(function () {
    SetUp();
});
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
    getRandomLetters();
    setUpTable();
    setDroppable();
    setDraggable();
    buildInfoTable();
}
function setUpTable() {

    var backgroundImage = "";
    var divStructure = "<div id='droppable{0}' class='ui-widget-header {1}'></div>"
    var divResult = "";
    for (var col = 0; col < 15; col++) {
        backgroundImage = "normalTile";
        if (col === 0 || col === 7 || col === 14)
            backgroundImage = "tripleTile";
        if (col === 3 || col === 11)
            backgroundImage = "doubleTile";
        divResult += String.format(divStructure, col, backgroundImage);
    }
    $("#containerDroppable").html(divResult);


    divStructure = "<div id='draggable{0}' class='piece ui-widget-content'>{1}</div>"
    divResult = "";
    for (var col = 0; col < 7; col++) {
        divResult += String.format(divStructure, col, newHand[col]);
    }
    $("#containerDraggable").html(divResult);
}


function setDroppable() {
    $(function () {
        $("[id^=droppable]").droppable({
            drop: function (event, ui) {
                $(this).addClass("ui-state-highlight");
                updateInfo(ui);
               
            }
        });
    });
}

function updateInfo(ui){
    var tileInfo = ui.draggable.text();
    var letter = tileInfo.split(",")[0];
    var score = tileInfo.split(",")[1];
    
    var currentWord = $("#word").text();
    var currentScore = parseInt($("#score").text());

    $("#word").text(currentWord + letter);
    $("#score").text(parseInt(currentScore) + parseInt(score));
                
}

function setDraggable() {
    $(function () {
        $("[id^=draggable]").draggable();
    });
}

function getRandomLetters() {
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    newHand = [];

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
    } else{
        ScrabbleTiles = original.slice();
        totalTiles = 100;
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
    $("#tileTotal").text(totalTiles);

}

function buildInfoTable() {
    var table = "";
    var rows = "";
    var columns = "";

    var tableStructure = "<table>\n{0}\n</table>";
    var rowStructure = "<tr>\n{0}\n</tr>\n";
    var colStructure = "<td>\n{0}\n</td>\n";

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var letter = "";

    for (var i = 0; i < alphabet.length; i++) {
        letter = alphabet.charAt(i);

        columns += String.format(colStructure, letter);
        columns += String.format(colStructure, ScrabbleTiles[letter]["number-remaining"]);

        rows += String.format(rowStructure, columns);
        columns = "";
    }

    table = String.format(tableStructure, rows);

    $("#infoTable").html(table);
}

function submitAndUpdate(){
    var word = $("#word").text().toLowerCase();
    
    if(findWord(word) != "")
        $("#result").text(word + " is a word").attr("style", "color: lime");
    else
        $("#result").text(word + " is a not word").attr("style", "color: red");
}


///////////////////Stolen code region//////////////////////
//taken from Jason on Piazza
var dict = {};
 
// Do a jQuery Ajax request for the text dictionary
$.get( "tiles/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }
});
 
// Modified to only pass in one word, which can then be verified.

function findWord( word ) {
    // See if it's in the dictionary
    if ( dict[ word ] ) {
        // If it is, return that word
        return word;
    }

    // Otherwise, it isn't in the dictionary.
    return "";
}

///////////////End stolen code region////////////////////