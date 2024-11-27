function HEXtoBIN(hex) {
    return hex
        .split('') // Divide o string hexadecimal em caracteres individuais
        .map(char => parseInt(char, 16).toString(2).padStart(4, '0')) // Converte cada caractere para binário e preenche com zeros
        .join(''); // Junta tudo em uma única string
}

export default HEXtoBIN