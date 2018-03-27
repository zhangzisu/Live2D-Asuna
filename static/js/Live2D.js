 
var live2DHelper;
$(function(){
  initLive2D();
});
/**
 * --------------------------------------------------
 *                     live2d
 * --------------------------------------------------
 */
function initLive2D() {
  if($("#glcanvas").length == 0) {
    return;
  }
  if($(window).width() < 1150) {
    return;
  }
  $.getScript("/static/js/live2d.min.js").done(function() {
    $.getScript("/static/js/live2d-helper.min.js").done(function() {
      loadModel();
    });
  });
}

function loadModel() {
  live2DHelper = new Live2DHelper({canvas: 'glcanvas'});
  var arr = ["01", "02", "03", "06", "12", "29"];
  arr = shuffle(arr);
  console.info("Model : " + arr[0]);
  var path = "/static/live2d/asuna/asuna_" + arr[0] + "/asuna_" + arr[0] + ".model.json";
  live2DHelper.loadModel(path, function(){
    live2DHelper.startMotion("", "0");
    live2DHelper.startTurnHead();
    followMouse();

    if(!$("#glcanvas").hasClass("animated")) {
      $("#glcanvas").addClass("animated fadeIn");
    }
    //seeMenu();
  });
}

function followMouse() {
  // head follow mouse
  var isMouseDown = false;
  $("#glcanvas").mousedown(function(e){
    isMouseDown = true;
  })
  .mouseup(function(e){
    isMouseDown = false;
  })
  .mouseout(function(e){
    isMouseDown = false;
    if(live2DHelper != null) {
      live2DHelper.viewPointer(0, 0);
    }
  })
  .mousemove(function(e){
    if(live2DHelper != null) {
      live2DHelper.followPointer(e);
      //console.log("---"  + e.pageX + "   " + e.pageY)
    }
  });
  // click
  // $(".wrapper").click(function(e){
  //   if(live2DHelper != null) {
  //     live2DHelper.followPointer(e);
  //   }
  // });
}

function seeMenu() {
  var $canvas = $("#glcanvas");
  var a = $canvas.width();
  var b = $canvas.height();
  var c = $(window).width();
  var d = $(window).height();
  console.log(a + " " + c + " " + b + " " + d)
  $("a[data-pjax]").mousemove(function(e){
    if(live2DHelper != null) {
      //live2DHelper.followPointer(e);
      // live2DHelper.viewPointer(parseInt(e.pageX * a / c), parseInt(e.pageY * b / d));
      // console.log(parseInt(e.pageX * a / c)+ "   " + parseInt(e.pageY * b / d))
    }
  })
  .mouseout(function(e){
    if(live2DHelper != null) {
      live2DHelper.viewPointer(0, 0);
    }
  });
}

/**
 * --------------------------------------------------
 *                       tool
 * --------------------------------------------------
 */

/**
 * return a random number
 * @param  {int} min number
 * @param  {int} max number
 * @return {int} random number
 */
function getRandomNum(min, max) {
  var range = max - min;   
  return (min + Math.round(Math.random() * range));
}

/**
 * return a random array
 * @param  {int} min number
 * @param  {int} max number
 * @return {Array} shuffle array
 */
function getRandomArr(min, max){
  var arr = [];
  for(var i = 0; i <= max - min; i++){
    arr[i] = min + i;
  }
  // arr.sort(function(){
  //   return 0.5-Math.random();
  // });
  shuffle(arr);
  return arr;
}

/**
 * shuffle
 * @param  {Array} 
 * @return {Array} 
 */
function shuffle(arr){
  var length = arr.length,
    temp,
    random;
  while(0 != length){
    random = Math.floor(Math.random() * length)
    length--;
    // swap
    temp = arr[length];
    arr[length] = arr[random];
    arr[random] = temp;
  }
  return arr;
}
