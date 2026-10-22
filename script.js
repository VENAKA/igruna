// Функція колірного хешування 
function colorHash(text) {
    if (!text || text.length === 0) {
        return ["#000000", "#000000", "#000000"];
    }

    // 1. Обчислюємо початкове 32-бітне число
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        // Код символу додаємо до хешу з побітовим зсувом
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; 
    }

    // 2. Генеруємо 3 HEX-кольори
    let colors = [];
    for (let c = 0; c < 3; c++) {
        let value = Math.abs(hash ^ (c * 1000007));

        let r = (value) % 256;
        let g = (value >> 8) % 256;
        let b = (value >> 16) % 256;

        let hexR = r.toString(16).padStart(2, '0');
        let hexG = g.toString(16).padStart(2, '0');
        let hexB = b.toString(16).padStart(2, '0');

        colors.push("#" + hexR + hexG + hexB);
    }

    return colors;
}


function runHashApp() {
    let text = document.getElementById('inputText').value;

    
    let colorArray = colorHash(text);

    
    let blocksHtml = "";
    for (let i = 0; i < colorArray.length; i++) {
        blocksHtml += '<div class="color-box" style="background-color: ' + colorArray[i] + ';" title="' + colorArray[i] + '"></div>';
    }
    document.getElementById('colorBlocks').innerHTML = blocksHtml;

    
    document.getElementById('outString').innerText = text;
    document.getElementById('outHex').innerText = colorArray.join("  ");
    
    if (text.length > 0) {
        document.getElementById('outStatus').innerText = "Хеш успішно згенеровано!";
    } else {
        document.getElementById('outStatus').innerText = "Попередження: введено порожній рядок";
    }
}


document.getElementById('runBtn').addEventListener('click', runHashApp);

runHashApp();