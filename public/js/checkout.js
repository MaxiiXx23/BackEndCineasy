
function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}

function ValidaCPF() {
    var RegraValida = document.getElementById("cpf").value;
    var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    if (cpfValido.test(RegraValida) == true) {
        console.log("CPF Válido");
    } else {
        console.log("CPF Inválido");
    }
}
function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

$('#formDados').click(function () {
    $.ajax({
        url: 'http://192.168.11.7:3000/pagamento/checkout/1',
        type: 'POST',
        data: {
            name: $('#nomeFull').val(),
            numeroCard: $('#NumeroCard').val(),
            codCard: $('#codCard').val(),
            cpf: $('#cpf').val(),
        },
        dataType: 'json',
        success: function () {
            alert('Your submission was successful');
        },
        error: function (data) {
            alert('errooooooooo');
        }
    });
});