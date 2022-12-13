var player1 = prompt('Player 1 enter name.')
var player1Color= 'rgb(86, 151, 255)'

var player2 = prompt('Player 2 enter name.')
var player2Color = 'rgb(237, 45, 73)'

var gameon = true
var table = $('table tr')

function reportWin(rowNum,colNum){
    console.log('You won starting at this row, col')
    console.log(rowNum)
    console.log(colNum)

}

function changeColor(rowIndex,colIndex,color){

    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)

}

function returnColor(rowIndex,colIndex){

    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')


}

function checkBottom(colIndex){

    var colorReport = returnColor(5,colIndex)

    for(var row = 5; row > -1; row--) {
        colorReport = returnColor(row,colIndex)
        if (colorReport === 'rgb(128, 128, 128)'){
            return row
        }
        
    }


}

function colorMatch(one,two,three,four){

    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)

}

//horiontal win

function horizonCheck(){

    for(row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if (colorMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
                console.log('horizon')
                reportWin(row,col)
                return true
            }else{
                console.log('none horizon')
                continue
            }
        }
    }
}

//vertical check

function verticalCheck(){

    for(col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if (colorMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
                console.log('verti')
                reportWin(row,col)
                return true
            }else{
                console.log('none verti')
                continue
            }
        }
    }
}

//diagonal check

function diagonalCheck(){
    for(var col=0;col<5;col++){
        for(var row=0;row<7;row++){
            if (colorMatch(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))) {
               console.log('diag win')
               reportWin(row,col)
               return true
            }else if(colorMatch(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log('diag win')
                reportWin(row,col)
                return true
            }else{
                continue
            }
        }
    }


}

var currentPlayer = 1
var currentName = player1
var currentColor = player1Color

$('h3').text(player1+' it is your turn to play')

$('.board button').on('click',function(){
    var col = $(this).closest('td').index()
    var bottomAvail= checkBottom(col)

    changeColor(bottomAvail,col,currentColor)

    if(horizonCheck()||verticalCheck()||diagonalCheck()){
        $('h1').text(currentName+' you have won. Refresh Page to start over.')
        $('h3').fadeOut('fast')
        $('h2').fadeOut('fast')
        
    }
    currentPlayer = currentPlayer * -1

    if (currentPlayer === 1) {
        currentName = player1
        $('h3').text(currentName+' it is your turn')
        currentColor=player1Color
        
    }else{
        currentName = player2
        $('h3').text(currentName+' it is your turn')
        currentColor=player2Color
    }
})