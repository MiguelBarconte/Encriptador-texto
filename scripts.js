const text = document.getElementById('text');
const exitText = document.getElementById('exit_text');

async function copiarTexto() {
    const textoACopiar = exitText.textContent;
    try {
        await navigator.clipboard.writeText(textoACopiar);
        alert('Texto copiado al portapapeles');
    } catch (error) {
        console.error('Error al copiar el texto:', error);
    }
}

function encriptar() {
    let baseText = text.value;
    if (baseText.trim() != '') {
        let textL = baseText.length;
        let codeNum = parseInt(Math.random() * 6 + 3);
        let max = 126 - codeNum;
        let list = [];
        for (let i = 0; i < textL; i++) {
            let char = baseText.charAt(i);
            let c = char.charCodeAt(0);
            if( c != 32){
                if (c > max) {
                    let a = c + codeNum;            
                    let b = a - 126;    
                    c = b + 33;
                } else {
                    c += codeNum;
                }
            }         
            list.push(c);
        }
        this.codificacion(list, codeNum);
    }

}

function codificacion(list, code) {
    let newText = '';
    for (let c of list) {
        let char = String.fromCharCode(c);
        console.log(typeof char);
        newText += char;
    }
    if (code) {
        exitText.innerText = newText + code;
    } else {
        exitText.innerText = newText;
    }

    console.log(newText);
}
/* Usar el codigo ASCII desde el 32 hasta el 126. mantenerlo en ese rango.*/
function desencriptar() {
    let baseText = text.value;
    let textL = baseText.length - 1;
    let codeNum = parseInt(baseText.charAt(textL));
    let min = 33 + codeNum;
    let list = [];
    for (let i = 0; i < textL; i++) {
        let char = baseText.charAt(i);
        let c = char.charCodeAt(0);
        if(c != 32){
            if (c < min) {
                let a = c - codeNum;
                console.log('a = ' + a);
                let b = 33 - a;
                console.log('b = ' + b);
                c = 126 - b;
            } else {
                c -= codeNum;
            }
        }
        list.push(c);
    }
    this.codificacion(list);
}

function clean() {
    text.value = '';
}