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
    'return',
    'function',
    'class',
    'printf',
];

const operators = [
    '(',
    ')',
    '{',
    '}',
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
    '+=',
    '-=',
    '*=',
    '/=',
    '++',
    '--',
];

function lexer(str) {
    str = str.trim();
    let arr = [''];
    let tmp = [];
    str = str.split('\n');

    for (i = 0; i < str.length; i++) {
        if (str[i].includes("//")) {
            str[i] = str[i].split("//")[0];
        }
    }

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
    return arr;
}

function tokens(lexeme) {
    let tokens = [];
    let flag = false;
    let error;

    lexeme = lexer(lexeme);

    if (lexeme == "") {
        return "Empty error";
    }

    for (i = 0; i < lexeme.length; i++) {

        let temp = [];

        if (keywords.includes(lexeme[i])) {
            temp['Keyword'] = lexeme[i];
            tokens.push(temp);
        } else if (operators.includes(lexeme[i])) {
            temp['Operator'] = lexeme[i];
            tokens.push(temp);
        } else if (/(^(?![0-9_])[\w]+$)/gm.test(lexeme[i])) {
            temp['Identifier'] = lexeme[i];
            tokens.push(temp);
        } else if (/^[0-9]+$/.test(lexeme[i]) || /^(["][^"]+["])|(['][^']+['])$/g.test(lexeme[i])) {
            temp['Constant'] = lexeme[i];
            tokens.push(temp);
        } else if (lexeme[i] == "" || lexeme[i] == " ") {
            continue;
        } else {
            flag = true;
            error = lexeme[i];
        }
    }


    if (flag) {
        return "There is error in : " + error;
    }

    return tokens;
}


$("#try").click(function () {
    let lexeme = $("#lexeme").val();
    let arr = tokens(lexeme);
    $("#table").html("");

    if (arr.includes("error")) {
        $("#alert").removeClass("d-none");
        $("#alert").addClass("d-block");
        $("#tokens_number").removeClass("d-block");
        $("#tokens_number").addClass("d-none");
        $("#alert").text(arr);
    } else {
        $("#tokens_number").text("Number of Tokens : " + arr.length);
        $("#tokens_number").removeClass("d-none");
        $("#tokens_number").addClass("d-block");
        $("#alert").removeClass("d-block");
        $("#alert").addClass("d-none");
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