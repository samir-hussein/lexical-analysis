const keywords = [
    'if',
    'else',
    'int',
    'char',
    'bool',
    'float',
    'double',
    'string',
    'for',
    'while',
    'do',
    'switch',
    'case',
    'default',
    'break',
    'continue',
    'return',
    'function',
    'class',
    'printf',
    'cout',
    'cin',
    'let',
    'var',
];

const operators = [
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '+',
    '-',
    '*',
    '/',
    '%',
    '=',
    ':',
    ';',
    ',',
    '.',
    '&&',
    '||',
    '>',
    '<',
    '==',
    '>=',
    '<=',
    '!=',
    '<>',
    '>>',
    '<<',
    '+=',
    '-=',
    '*=',
    '/=',
    '++',
    '--',
];

function removeComments(str) {
    for (i = 0; i < str.length; i++) {
        if (str[i].includes("//")) {
            str[i] = str[i].split("//")[0];
        }
    }
}

function lexer(str) {
    // remove white spaces from start & end of whole code
    str = str.trim();
    // split whole code into separate lines
    str = str.split('\n');

    let arr = [''];
    let tmp = [];

    // remove comments from whole code
    removeComments(str);

    for (j = 0; j < str.length; j++) {
        tmp = str[j].split("");
        for (i = 0; i < tmp.length; i++) {

            if (/^(["][^"]*$)|^(['][^']*$)/g.test(arr[arr.length - 1])) {
                arr[arr.length - 1] += tmp[i];
            }

            else if (operators.includes(arr[arr.length - 2] + tmp[i])) {
                arr[arr.length - 2] += tmp[i];
            }

            else if (operators.includes(tmp[i])) {
                if (arr[arr.length - 1] != "") {
                    arr.push(tmp[i]);
                } else {
                    arr[arr.length - 1] += tmp[i];
                }
                arr.push("");
            }

            else if (tmp[i] == " " && arr[arr.length - 1] != "") {
                arr.push("");
            }

            else if (tmp[i] == " ") {
                continue;
            }

            else {
                arr[arr.length - 1] += tmp[i];
            }
        }
    }

    if (arr[arr.length - 1] == "") {
        arr.pop();
    }

    return arr;
}

function tokens(lexeme) {
    let tokens = [];
    let temp = [];

    lexeme = lexer(lexeme);

    if (lexeme == "") {
        return "Empty error";
    }

    for (i = 0; i < lexeme.length; i++) {
        if (keywords.includes(lexeme[i])) {
            temp['Keyword'] = lexeme[i];
        }

        else if (operators.includes(lexeme[i])) {
            temp['Operator'] = lexeme[i];
        }

        else if (/(^(?![0-9_])[\w]+$)/gm.test(lexeme[i])) {
            temp['Identifier'] = lexeme[i];
        }

        else if (/^[0-9]+$/.test(lexeme[i]) || /^(["][^"]+["])|(['][^']+['])$/g.test(lexeme[i])) {
            temp['Constant'] = lexeme[i];
        }

        else {
            return "There is error in : " + lexeme[i];
        }

        tokens.push(temp);
        temp = [];
    }

    return tokens;
}


$("#try").click(function () {
    let lexeme = $("#lexeme").val();
    let arr = tokens(lexeme);
    $("#table").html("");

    if (arr.includes("error")) {
        $("#error").removeClass("d-none");
        $("#error").addClass("d-block");
        $("#tokens_number").removeClass("d-block");
        $("#tokens_number").addClass("d-none");
        $("#error").text(arr);
    } else {
        $("#tokens_number").text("Number of Tokens : " + arr.length);
        $("#tokens_number").removeClass("d-none");
        $("#tokens_number").addClass("d-block");
        $("#error").removeClass("d-block");
        $("#error").addClass("d-none");
        for (i = 0; i < arr.length; i++) {
            for (var key in arr[i]) {
                $("#table").append(`<tr>
                    <td>`+ arr[i][key] + `</td>            
                    <td>`+ key + `</td>            
                </tr>`);
            }
        }
    }

});

const textarea = document.querySelector("#lexeme");
textarea.addEventListener("keyup", e => {
    textarea.style.height = "150px";
    let sclHeight = e.target.scrollHeight;
    textarea.style.height = `${sclHeight}px`;
})