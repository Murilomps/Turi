function sumirInput () {

    // variáveis Turi
    var nomeUsuario = document.getElementById("nomeUsuario")
    var emailTuri = document.getElementById("emailTuri")
    var senhaTuri = document.getElementById("senhaTuri")
    var codEmpresa = document.getElementById("codEmpresa")

    // variáveis Empresa Vestuário
    var nomeEmpresa = document.getElementById("nomeEmpresa")
    var codCnpj = document.getElementById("codCnpj")
    var codRua = document.getElementById("codRua");
    var codBairro = document.getElementById("codBairro");
    var codNumero = document.getElementById("codNumero")
    var codCidade = document.getElementById("codCidade")
    var senhaCliente = document.getElementById("senhaCliente")
    
    var mySwitch = document.getElementById('ipt_switch');
    
    console.log(mySwitch.checked);
    
    if(mySwitch.checked){
        nomeEmpresa.style.display = "grid"
        codCnpj.style.display = "grid"
        codRua.style.display = "grid"
        codBairro.style.display = "grid"
        codNumero.style.display = "grid"
        codCidade.style.display = "grid"
        senhaCliente.style.display = 'grid'

        nomeUsuario.style.display = 'none'
        emailTuri.style.display = 'none'
        senhaTuri.style.display = 'none'
        codEmpresa.style.display = 'none'

        // myInputEmpresa.placeholder = 'Nome da empresa';
    }else{
        nomeEmpresa.style.display = 'none'
        codCnpj.style.display = 'none'
        codRua.style.display = 'none'
        codBairro.style.display = 'none'
        codNumero.style.display = 'none'
        codCidade.style.display = 'none'
        senhaCliente.style.display = 'none'

        nomeUsuario.style.display = 'grid'
        emailTuri.style.display = 'grid'
        senhaTuri.style.display = 'grid'
        codEmpresa.style.display = 'grid'
       
       // myInputEmpresa.placeholder = 'Usuário';
    }
}

function validarSessao() {
    // aguardar();

    var identificador = sessionStorage.IDENTIFICADOR_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var nome_usuario = document.getElementById("nome_usuario");

    if (identificador != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        nome_usuario.innerHTML = nome;

        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}


function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

