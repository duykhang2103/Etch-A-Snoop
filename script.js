const boardSize = 300;
let color = "#000000";
let mode = 1;

function generateColor(){
    const colorContainer = document.createElement("div");
    let colorPicker = document.createElement("input");
    
    colorContainer.classList.add("color-container");
    colorPicker.classList.add("color-picker");
    colorPicker.setAttribute("type", "color");
    // colorPicker.setAttribute("id", "color-picker");
    colorPicker.setAttribute("name", "color-picker");
    colorPicker.setAttribute("value", color);
    console.log(color);
    colorPicker.onchange = e => {
        color = e.target.value;
    }
    colorContainer.appendChild(colorPicker);
    return colorContainer;
}

function generateMode(){
    const modeContainer = document.createElement("div");
    const colorButton = document.createElement("button");
    const rainbowButton = document.createElement("button");
    const eraseButton = document.createElement("button");
    const clearButton = document.createElement("button");

    let sizeSlider = document.getElementsByClassName("size-slider");
    let colorPicker = document.getElementsByClassName("color-picker");
    
    modeContainer.classList.add("mode-container");
    colorButton.classList.add("color-button");
    rainbowButton.classList.add("rainbow-button");
    eraseButton.classList.add("erase-button");
    clearButton.classList.add("clear-button");

    colorButton.innerText = "COLOR";
    rainbowButton.innerText = "RAINBOW";
    eraseButton.innerText = "ERASE";
    clearButton.innerText = "CLEAR";

    colorButton.onclick = ()=>{
        console.log(colorPicker);   
        color = colorPicker[0].value;
        mode = 1;
    }
    rainbowButton.onclick = ()=>{
        mode = 2;
    }
    eraseButton.onclick = ()=>{
        color = "#fff";
        mode = 3;
    }
    clearButton.onclick = ()=>{
        console.log(sizeSlider);
        renderBoard(sizeSlider[0].value);
    }

    modeContainer.appendChild(colorButton);
    modeContainer.appendChild(rainbowButton);
    modeContainer.appendChild(eraseButton);
    modeContainer.appendChild(clearButton);
    
    return modeContainer;
}

function generateSize(){
    const sizeContainer = document.createElement("div");
    const sizeSlider = document.createElement("input");

    sizeContainer.classList.add("size-container");
    sizeSlider.classList.add("size-slider");
    // sizeSlider.setAttribute("id", "size-slider");
    sizeSlider.setAttribute("type", "range");
    sizeSlider.setAttribute("name", "size-slider");
    sizeSlider.setAttribute("min", "1");
    sizeSlider.setAttribute("max", "128");
    sizeSlider.setAttribute("value", "1");

    sizeSlider.onchange = e => {
        let size = e.target.value;
        renderBoard(size);
    }

    sizeContainer.appendChild(sizeSlider);
    return sizeContainer;
}

function renderCell(event){
    if(mode == 2){
        color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
    event.target.style.backgroundColor = color;
    console.log(color);
}

function renderBoard(size){
    let board = document.querySelector(".board");
    board.remove();
    board = generateBoard();

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        
        // cell.style.width = `${boardSize / size}px`;
        // cell.style.height = `${boardSize / size}px`;

        // cell.addEventListener("mouseover", () => {renderCell(cell);});
        // boardContainer.push(cell);
        board.appendChild(cell);
    }
    document.getElementById("body").appendChild(board);
}

function generateBoard(){
    let board = document.createElement("div");
    board.addEventListener("mouseover", renderCell);
    board.classList.add("board");
    
    return board;    
}

function run(){
    let body = document.getElementById("body");
    // body.style.backgroundColor = "red";
    let setting = document.createElement("div");
    setting.classList.add("setting");
    setting.appendChild(generateColor());
    setting.appendChild(generateMode());
    setting.appendChild(generateSize());
    // console.log(body);
    body.appendChild(setting);
    body.appendChild(generateBoard());
    
}

run();