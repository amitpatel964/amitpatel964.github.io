"use strict"

class Game {
    constructor(gameName, packNumber, numberOfPlayers, gameType, audienceAllowed, familyFriendly) {
        this.gameName = gameName;
        this.packNumber = packNumber;
        this.numberOfPlayers = numberOfPlayers;
        this.gameType = gameType;
        this.audienceAllowed = audienceAllowed;
        this.familyFriendly = familyFriendly;
    }

    getGameName() {
        return this.gameName;
    }

    getPackNumber() {
        return this.packNumber;
    }

    getNumberOfPlayers() {
        return this.numberOfPlayers;
    }

    getGameType() {
        return this.gameType;
    }

    getAudiencedAllowed() {
        return this.audienceAllowed;
    }

    getFamilyFriendly() {
        return this.familyFriendly;
    }
}

class Filter {
    constructor(filterName, filterValue) {
        this.filterName = filterName;
        this.filterValue = filterValue;
    }

    getFilterName() {
        return this.filterName;
    }

    getFilterValue() {
        return this.filterValue;
    }

    setFilterValue(newFilterValue) {
        this.filterValue = newFilterValue;
    }
}

// Parameters that the user can alter
var filters = [];
filters.push(new Filter("hasPack1", true));
filters.push(new Filter("hasPack2", true));
filters.push(new Filter("hasPack3", true));
filters.push(new Filter("hasPack4", true));
filters.push(new Filter("hasPack5", true));
filters.push(new Filter("hasPack6", true));
filters.push(new Filter("hasPack7", true));
filters.push(new Filter("hasPack8", true));
filters.push(new Filter("triviaGamesFilter", false));
filters.push(new Filter("drawingGamesFilter", false));
filters.push(new Filter("fillInTheBlankGamesFilter", false));
filters.push(new Filter("otherGamesFilter", false));
filters.push(new Filter("audienceAllowedGamesFilter", false));
filters.push(new Filter("familyFriendlyGamesFilter", false));
var numberOfPlayersFilter = -1;

// Number of Jackbox games
const numberOfJackBoxGames = 8;

// Index number of certain filters in the filters array
const triviaGamesFilterIndex = 8;
const drawingGamesFilterIndex = 9;
const fillInTheBlankGamesFilterIndex = 10;
const otherGamesFilterIndex = 11;
const audienceAllowedGamesFilterIndex = 12;
const familyFriendlyGamesFilterIndex = 13;

// Build array of games from table data
var arrayOfGames = [];
var rows = document.getElementById("gamesTable").rows;

for (var i = 1; i < rows.length; i++) {
    var game = new Game(rows[i].cells[0].innerHTML, rows[i].cells[1].innerHTML, rows[i].cells[2].innerHTML, rows[i].cells[3].innerHTML, rows[i].cells[4].innerHTML, 
        rows[i].cells[5].innerHTML);
    arrayOfGames.push(game);
}

/**
 * This function is called whenever the user clicks on one of the checkboxes.
 * The filter method is then called to alter the table.
 * 
 * @param checkbox
 */
function searchCheckbox(checkbox) {

    for (var i = 0; i < filters.length; i++) {
        if (filters[i].getFilterName() == checkbox.name) {
            if (document.getElementById(checkbox.id).checked) {
                filters[i].setFilterValue(true);
            } else {
                filters[i].setFilterValue(false);
            }
        }
    }
    filterTable();
}

/**
 * This function is called when the user enters how many players will be playing.
 * 
 * @param element 
 */
function searchPlayerNumber(element) {
    if (element.value == "") {
        numberOfPlayersFilter = -1;
    } else {
        numberOfPlayersFilter = element.value;
    }
    filterTable();
}

/**
 * This function is used when the user presses the pick a game for me button.
 * It will randomly choose a game from the table.
 * 
 */
function pickRandomGameFromList() {
    var games = [];

    for (var i = 1; i < rows.length; i++) {
        if (rows[i].style.display == '') {
            games.push(rows[i].cells[0].innerHTML);
        }
    }

    if (games.length == 0) {
        alert("No games are present in the table");
    } else {
        alert(games[Math.floor(Math.random()*games.length)]);
    }
}

/**
 * This function is called to change the enteries of the table depending on the conditions the user sets.
 * 
 */
function filterTable() {
    // Reset display for each row to show all of the rows at first
    for (var i = 1; i < rows.length; i++) {
        rows[i].style.display = '';
    }

    // Check to see if any of the game type filters are checked
    // If so, only show games that have the checkmarked game type
    if (filters[triviaGamesFilterIndex].getFilterValue() || filters[drawingGamesFilterIndex].getFilterValue() || 
    filters[fillInTheBlankGamesFilterIndex].getFilterValue() || filters[otherGamesFilterIndex].getFilterValue()) {
        
        for (var i = 1; i < rows.length; i++) {
            rows[i].style.display = 'none';
        }

        // Show trivia games if trivia is checkmarked
        if (filters[triviaGamesFilterIndex].getFilterValue()) {
            for (var j = 0; j < arrayOfGames.length; j++) {
                if (arrayOfGames[j].getGameType().includes("Trivia")) {
                    rows[j+1].style.display = '';
                }
            }
        }

        // Show drawing games if drawing is checkmarked
        if (filters[drawingGamesFilterIndex].getFilterValue()) {
            for (var j = 0; j < arrayOfGames.length; j++) {
                if (arrayOfGames[j].getGameType().includes("Drawing")) {
                    rows[j+1].style.display = '';
                }
            }
        }

        // Show fill in the blank games if fill in the blank is checkmarked
        if (filters[fillInTheBlankGamesFilterIndex].getFilterValue()) {
            for (var j = 0; j < arrayOfGames.length; j++) {
                if (arrayOfGames[j].getGameType().includes("Fill in the Blank")) {
                    rows[j+1].style.display = '';
                }
            }
        }

        // Show other games if other is checkmarked
        if (filters[otherGamesFilterIndex].getFilterValue()) {
            for (var j = 0; j < arrayOfGames.length; j++) {
                if (arrayOfGames[j].getGameType().includes("Other")) {
                    rows[j+1].style.display = '';
                }
            }
        }
    }

    // Check if only games with an audience should be shown
    if (filters[audienceAllowedGamesFilterIndex].getFilterValue()) {
        for (var i = 0; i < arrayOfGames.length; i++) {
            if (arrayOfGames[i].getAudiencedAllowed() == "No") {
                rows[i+1].style.display = 'none';
            }
        }
    }

    // Check if only games that are or can be family friendly should be shown
    if (filters[familyFriendlyGamesFilterIndex].getFilterValue()) {
        for (var i = 0; i < arrayOfGames.length; i++) {
            if (arrayOfGames[i].getFamilyFriendly() == "No") {
                rows[i+1].style.display = 'none';
            }
        }
    }

    // Check if the user has packs 1 - 8
    for (var j = 1; j <= numberOfJackBoxGames; j++) {
        if (!filters[j-1].getFilterValue()) {
            for (var i = 0; i < arrayOfGames.length; i++) {
                if (arrayOfGames[i].getPackNumber() == j) {
                    rows[i+1].style.display = 'none';
                }
            }
        } 
    }

    // Check if the user entered a number for the number of players
    if (numberOfPlayersFilter != -1) {
        for (var i = 0; i < arrayOfGames.length; i++) {
            var bounds = arrayOfGames[i].getNumberOfPlayers().split("-");
            if (numberOfPlayersFilter < parseInt(bounds[0]) || numberOfPlayersFilter > parseInt(bounds[1])) {
                rows[i+1].style.display = 'none';
            }
        }
    }
}