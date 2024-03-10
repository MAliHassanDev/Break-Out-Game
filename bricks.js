
let brickContainer;
(function(){
    brickContainer = document.querySelector('[data-brickContainer]');
    const colors = ['#C9BC0C','#C81CA9','#CBCBCB','#ED0F0F','#2DF20F','#23ACDA','#F86203','#CBCBCB']
    const numRows = 7;
    const numColumns = 12;
    for(let i=0;i<numRows;i++){
      let color = colors[i]
      for(let j=0;j<numColumns;j++){
        const brick = document.createElement('li');
        brick.classList.add('brick');
        brick.setAttribute('data-brick', 'brick');
        brick.style.backgroundColor = color;
        brickContainer.appendChild(brick);
      }
    }
})();

export {brickContainer};