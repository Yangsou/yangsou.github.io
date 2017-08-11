window.onload = function(){
  init();
}

function init(){
  console.log('window init');
  var index = 0;
  var slider = new Slider(document.getElementsByClassName('slider_item'));
  slider.sliderAutomatic();

}

// function sliderAutomatic(index = 0){
//   var item = document.getElementsByClassName('slider_item'),
//       itemLength = item.length;
//
//   for(var i = 0; i < itemLength; i++){
//     // item[i].style.transform = 'translateX('+ i * 100 +'%)';
//     item[i].style.zIndex = '1';
//   }
//   console.log('index', index);
//   if(index == itemLength){
//     index = 0;
//   }
//   item[index].style.zIndex = 3;
//   index++;
//
//   setTimeout(function(){
//     sliderAutomatic(index);
//   }, 2000);
// }

function Slider(target){
  var $this = this,
      items = target,
      itemsLength = items.length;

  this.sliderAutomatic = function(index = 0){
    var prev = index - 1;
    if(prev < 0){
      prev = itemsLength - 1;
    }
    for(var i = 0; i < itemsLength; i++){
      items[i].style.zIndex = '1';
      items[i].classList.remove('prev');
      items[i].classList.remove('active');
    }
    if(index == itemsLength){
      index = 0;
      prev = itemsLength - 1;
    }
    items[prev].style.zIndex = 2;
    items[prev].classList.add('prev');
    items[index].style.zIndex = 3;
    items[index].classList.add('active');
    index++;

    setTimeout(function(){
      $this.sliderAutomatic(index);
    }, 5000);
  }

}
