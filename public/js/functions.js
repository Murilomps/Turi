function sumirInput () {

    var codTel = document.getElementById("codTel");
    var codEmpresa = document.getElementById("codEmpresa")
    var codCnpj = document.getElementById("codCnpj")
    var mySwitch = document.getElementById('ipt_switch');
    var myInputEmpresa = document.getElementById('empresa');
    
    console.log(mySwitch.checked);
    
    if(mySwitch.checked){
        codTel.style.display = 'grid'
        codEmpresa.style.display = 'none'
        codCnpj.style.display = "grid"
        myInputEmpresa.placeholder = 'Nome da empresa';
    }else{
        codTel.style.display = 'none'
        codEmpresa.style.display = 'grid'
        codCnpj.style.display = "none"
        myInputEmpresa.placeholder = 'Usuário';
    }
}