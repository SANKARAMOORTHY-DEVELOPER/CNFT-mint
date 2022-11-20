$(document).ready(function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  
  // set default values
  $('#colour1').attr('value', '44,62,80');
  $('#colour2').attr('value', '52,152,219');
  $('#squares').attr('value', 10);
  var numSquares = $('#squares').val();
  var first = $('#colour1').val().split(',');
  var second = $('#colour2').val().split(',');
  
  // dimensions of each square
  var sqH = Math.floor(canvas.height / numSquares);
  
  // variable to store each square's colours
  var rgb = [];
  
  // draw squares and fill in gradient
  rgb = draw(numSquares, sqH, ctx, first, second);
  
  // if button is clicked
  $('.grad').click(function() {
    // get colours (if any)
    var firstColour = $('#colour1').val().split(',');
  
    var secondColour = $('#colour2').val().split(',');
    
    // get the number of squares (if any)
    numSquares = $('#squares').val();
    
    // generate new square height
    sqH = Math.floor(canvas.height / numSquares);
    
    // draw the squares
    rgb = draw(numSquares, sqH, ctx, firstColour, secondColour);  
  });
  
  // if any square is clicked
  $('canvas').click(function(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    
    // real height of canvas (necessary because vh)
    var trueHeight = $(window).height() * 0.45
    sqH = trueHeight / numSquares;
    
    // get the exact square
    x = Math.floor(x/sqH);
    y = Math.floor(y/sqH);
    
    // translate coordinate system into array position
    var pos = y * numSquares + x;
    var num = rgb[pos];

    $('.rgb').html(num[0] + "," + num[1] + "," + num[2]);
  });
  
  // if randomize is clicked
  $('.rand').click(function() {
    var firstRand = [];
    var secondRand = [];
    
    // generate the random colours
    for (var i = 0; i < 3; i++) {
      firstRand[i] = Math.floor(Math.random() * 256);
      secondRand[i] = Math.floor(Math.random() * 256);
    }
    // change the values in the textfield to reflect new colours
    $('#colour1').prop('value', firstRand);
    $('#colour2').prop('value', secondRand);
    
    // draw squares and fill in gradient
    rgb = draw(numSquares, sqH, ctx, firstRand, secondRand);
  });
});

// function to draw squares and fill in gradient
var draw = function(numSquares, sqH, ctx, first, second) {
  // array to store all rgb values
  var rgb = [];
  
  // some math for colour gradients
  var diff1 = first[0]-second[0];
  var diff2 = first[1]-second[1];
  var diff3 = first[2]-second[2];
  
  var mult1 = diff1/(numSquares-1);
  var mult2 = diff2/(numSquares-1);
  var mult3 = diff3/(numSquares-1);
  for (var i = 0; i < numSquares; i++) {
    for (var j = 0; j < numSquares; j++) {
      // variable to store a certain square's rgb value 
      var colour = [];
      colour[0] = Math.floor(first[0]-(mult1*i));
      colour[1] = Math.floor(first[1]-(mult2*j));
      colour[2] = Math.floor(first[2]-(mult3*i));
      rgb.push(colour);
      // change this line to fit two colors specified by user
      ctx.fillStyle = 'rgb(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ')';
      ctx.fillRect(i*sqH, j*sqH, sqH, sqH);
    }
  }
  // return array of colours
  return rgb;
}