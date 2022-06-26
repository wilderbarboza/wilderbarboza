import database from "./database.js";
import elemento from "./elements.js"
var addInputTbl = 'login';
var itemMax;
var newx;
var addUpd;
var objequipamento;
var objdonwloads;
var objtelefones;
var objestoque;
var objentrada;
var objsaida;
var objsenhas;

 //objetos de novo elemento
 var idofDoc;
 var new_item ={}; //variavel que auxiliar para adicionar novo item a tabela

function start(){
    elemento.tbl.forEach(item=>{
        item.innerHTML=''
    })
    elemento.tblTitle.innerHTML='';
    document.querySelector('.menu').style.display='none';
    elemento.btnAdd.style.display='none';
    addInputTbl='login';
    addItem();
}
 function afterlogin(){
    addInputTbl='equipamentos'
    database.dados()
    elemento.modal.style.display='none'
    elemento.backmodal.style.display='flex'
    elemento.loading.style.display='flex'
    document.querySelector('.menu #equipamentos').classList.add('active')
    document.querySelector('.menu #sair').classList.remove('active')
    setTimeout(()=>{
        elemento.backmodal.style.display='none'
        elemento.loading.style.display='none';
        elemento.Delete.style.display='none';
        document.querySelector('.menu').style.display='flex';
        elemento.btnAdd.style.display='block';
    },1000) 
}
start()
//elementos de botões//

elemento.menu.forEach(item=>{
    item.addEventListener('click', mainMenu)
})
elemento.subMenuItem.forEach(subitem=>{
subitem.addEventListener('click',mainMenu)
})
elemento.formu.forEach(add=>{
    add.addEventListener('submit',function salvar(event){
        event.preventDefault();
        addElement('newitem');
    })
})
elemento.btnCancelar.forEach(cancel=>{
    cancel.addEventListener('click',btnCancela)
})
elemento.btnAdd.addEventListener('click',()=>{
    elemento.inputForm.forEach(item=>{
        item.value="";           //deixa formulário em branco//
    })
    addItem()
});
elemento.inputForm.forEach(form=>{
    form.addEventListener('focus',mudacorinput)
})
elemento.btnConfirma.addEventListener('click',()=>{
    if(addInputTbl=='entrada'){
        console.log(objentrada[newx])
        database.deleteEstoque(addInputTbl,objentrada[newx])
        window.alert("Confirmado")
        elemento.loading.style.display='flex';
        elemento.modal.style.display='none';
        elemento.Delete.style.display='none';
        elemento.loading.style.display='flex';
        loadAdd();
        

    }
    if(addInputTbl=='saida'){
        database.deleteEstoque(addInputTbl,objsaida[newx])
        window.alert("Confirmado")
        elemento.loading.style.display='flex';
        elemento.modal.style.display='none';
        elemento.Delete.style.display='none';
        elemento.loading.style.display='flex';
        loadAdd();
        

    }  
    else{
    database.crud('del',addInputTbl,newx);
    window.alert("Confirmado")
    elemento.loading.style.display='flex';
    elemento.modal.style.display='none';
    elemento.Delete.style.display='none';
    elemento.loading.style.display='flex';
    loadAdd()
    }
    
});


//mudança de menu borda do menu//
function mainMenu(element){
    addInputTbl=element.target.id;
    elemento.menu.forEach(item=>{
        if(item.id!==element.target.id){
            item.classList.remove('active')
        }else{
            item.classList.add('active')
        }
        elemento.subMenuItem.forEach(item=>{
            if(item.id!==element.target.id){
                item.classList.remove('active')
            }else{
                item.classList.add('active')
            }
        })
    })
    exibeTbl()
    if(addInputTbl=='sair'){
        database.logout()
        start()
    }
}
//função de exibir tabela conforme o texto presente no menu//
function exibeTbl(){
switch(addInputTbl){
    case 'equipamentos':
        elemento.imgBackground.setAttribute('src', "./images/2.svg")
        elemento.tblTitle.innerHTML="Equipamentos";
        ocultasubmenu();
        mostraAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
    case 'downloads':
        elemento.tblTitle.innerHTML="Downloads"
        elemento.imgBackground.setAttribute('src', "./images/3.svg")
        ocultasubmenu();
        mostraAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
    case 'telefones':
        elemento.tblTitle.innerHTML="Telefones"
        elemento.imgBackground.setAttribute('src', "./images/4.svg")
        ocultasubmenu();
        mostraAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
    case 'estoque':
        elemento.imgBackground.setAttribute('src', "./images/5.svg")
        elemento.tblTitle.innerHTML="Estoque"
        mostrasubmenu();
        ocultaAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
    case 'senhas':
        elemento.imgBackground.setAttribute('src', "./images/8.svg")
        elemento.tblTitle.innerHTML="Senhas"
        ocultasubmenu();
        mostraAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
    case 'entrada':
        elemento.imgBackground.setAttribute('src', "./images/6.svg")
        elemento.tblTitle.innerHTML="Entradas";
        mostraAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
    case 'saida':
        elemento.imgBackground.setAttribute('src', "./images/7.svg")
        elemento.tblTitle.innerHTML="Saidas"
        mostraAdd();
        limpaTabela(addInputTbl);
        btnDelete();
        btnUpdate();
    break;
}
}
//montagem das taelas//

function mountTbl(page,obj){
    switch(page){
        case 'equipamentos'://monta tabela equipamentos//
            objequipamento=obj
            let tabelaEquipamentos='';
            if(obj==null){
                elemento.tblEquipamentos.innerHTML="Tabela Vazia"
            }else{
            obj.forEach(item=>{
            tabelaEquipamentos+=`
            <tr>
                <td>${item.Id}</td>
                <td>${item.tipo}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.ip}</td>
                <td>${item.macaddress}</td>
                <td>${item.local}</td>
                <td><i class="fa-solid fa-square-pen" data-item=${item.Id}></i> <i class="fa-solid fa-square-minus" data-item=${item.Id}></i></td>
            </tr>`
            })
        elemento.tblEquipamentos.innerHTML=
        `<thead>
        <tr>
            <td>ID</td>
            <td>TIPO</td>
            <td>MARCA</td>
            <td>MODELO</td>
            <td>IP</td>
            <td>MAC-ADDRESS</td>
            <td>LOCAL</td>
            <td>OPÇÕES</td>
            </tr>
        </thead>
        <tbody>
        ${tabelaEquipamentos}
        </tbody>`
        }
        exibeTbl()
        break
        case 'downloads': //monta tabela downloads//
            objdonwloads=obj
            let tabelaDownloads='';
            if(obj==null){
                elemento.tblDownloads.innerHTML="Tabela Vazia"
            }else{
            obj.forEach(item=>{
            tabelaDownloads+=`
            <tr>
                <td>${item.Id}</td>
                <td>${item.nomearquivo}</td>
                <td>${item.site}</td>
                <td>${item.descricao}</td>
                <td><i class="fa-solid fa-square-pen" data-item=${item.Id}></i> <i class="fa-solid fa-square-minus" data-item=${item.Id}></i></i></td>
            </tr>`
            })
        elemento.tblDownloads.innerHTML=
        `<thead>
        <tr>
            <td>ID</td>
            <td>NOME DO ARQUIVO</td>
            <td>SITE</td>
            <td>DESCRIÇÃO</td>
            <td>OPÇÕES</td>
            </tr>
        </thead>
        <tbody>
        ${tabelaDownloads}
        </tbody>`
        }
        exibeTbl()
        break
        case 'telefones': //monta tabela telefones//
        objtelefones=obj
        let tabelaTelefones='';
        if(obj==null){
            elemento.tblTelefone.innerHTML="Tabela Vazia"
        }else{
        obj.forEach(item=>{
        tabelaTelefones+=`
        <tr>
            <td>${item.Id}</td>
            <td>${item.Colaborador}</td>
            <td>${item.empresa}</td>
            <td>${item.numero}</td>
            <td><i class="fa-solid fa-square-pen" data-item=${item.Id}></i> <i class="fa-solid fa-square-minus" data-item=${item.Id}></i></i></td>
        </tr>`
        })

    elemento.tblTelefone.innerHTML=
    `<thead>
    <tr>
        <td>ID</td>
        <td>NOME DO COLABORADOR</td>
        <td>EMPRESA</td>
        <td>NUMERO</td>
        <td>OPÇÕES</td>
        </tr>
    </thead>
    <tbody>
    ${tabelaTelefones}
    </tbody>`
    }
    exibeTbl()
    break
        case 'estoque':  //monta tabela estoque//
        objestoque=obj
        if(obj==null){
            elemento.tblEstoque.innerHTML="Tabela Vazia"
        }else{
            let tabelaEstoque='';
            obj.forEach(item=>{
            tabelaEstoque+=`
            <tr>
                <td>${item.Id}</td>
                <td>${item.tipo}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.quant}</td>
            </tr>`
            })

        elemento.tblEstoque.innerHTML=
        `<thead>
        <tr>
            <td>ID</td>
            <td>TIPO</td>
            <td>MARCA</td>
            <td>MODELO</td>
            <td>QUANTIDADE</td>
            </tr>
        </thead>
        <tbody>
        ${tabelaEstoque}
        </tbody>`
        exibeTbl()
        }
        break;
        case 'entrada':  //monta tabela entradas//
            let tabelaEntradas='';
            objentrada=obj
            if(obj==null){
                elemento.tblEntradas.innerHTML="Tabela Vazia"
            }else{
            obj.forEach(item=>{
            let data = item.data_a.split('-')
            let new_data = `${data[2]}/${data[1]}/${data[0]}`
            tabelaEntradas+=`
            <tr>
                <td>${item.Id}</td>
                <td>${item.tipo}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.empresa}</td>
                <td>${item.quant}</td>
                <td>${new_data}</td>
                <td><i class="fa-solid fa-square-pen" data-item=${item.Id}></i> <i class="fa-solid fa-square-minus" data-item=${item.Id}></i></td>
            </tr>`
            })

        elemento.tblEntradas.innerHTML=
        `<thead>
        <tr>
            <td>ID</td>
            <td>TIPO</td>
            <td>MARCA</td>
            <td>MODELO</td>
            <td>EMPRESA</td>
            <td>QUANTIDADE</td>
            <td>DATA AQUISIÇÃO</td>
            <td>OPÇÕES</td>
            </tr>
        </thead>
        <tbody>
        ${tabelaEntradas}
        </tbody>`
        exibeTbl()
        }
        break;
        case 'saida':  //monta tabela saidas//
            objsaida=obj
            let tabelaSaidas='';
            elemento.tblSaidas.style.display='none'
            if(obj==null){
                elemento.tblSaidas.innerHTML="Tabela Vazia"
            }else{
            obj.forEach(item=>{
            tabelaSaidas+=`
            <tr>
                <td>${item.Id}</td>
                <td>${item.tipo}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.tipoE}</td>
                <td>${item.marcaE}</td>
                <td>${item.modeloE}</td>
                <td>${item.quant}</td>
                <td>${item.data_s}</td>
                <td>${item.obsE}</td>
                <td><i class="fa-solid fa-square-pen" data-item=${item.Id}></i> <i class="fa-solid fa-square-minus" data-item=${item.Id}></i></td>
            </tr>`
            })

        elemento.tblSaidas.innerHTML=
        `<thead>
        <tr>
            <td>ID</td>
            <td>TIPO PRODUTO</td>
            <td>MARCA PRODUTO</td>
            <td>MODELO PRODUTO</td>
            <td>TIPO EQUIPAMENTO</td>
            <td>MARCA EQUIPAMENTO</td>
            <td>MODELO EQUIPAMENTO</td>        
            <td>QUANTIDADE</td>
            <td>DATA DA SAIDA</td>
            <td>OBSERVAÇÕES</td>
            <td>OPÇÕES</td>
            </tr>
        </thead>
        <tbody>
        ${tabelaSaidas}
        </tbody>`
        exibeTbl()
        }
        break;
        case 'senhas':
            let tabelaSenhas='';
            objsenhas=obj
            if(obj==null){
                elemento.tblSenhas.innerHTML="Tabela Vazia"
            }else{
            obj.forEach(item=>{
            tabelaSenhas+=`
            <tr>
                <td>${item.Id}</td>
                <td>${item.site}</td>
                <td>${item.usuario}</td>
                <td>${item.senha}</td>
                <td>${item.descricao}</td>
                <td><i class="fa-solid fa-square-pen" data-item=${item.Id}></i> <i class="fa-solid fa-square-minus" data-item=${item.Id}></i></td>
            </tr>`
            })

        elemento.tblSenhas.innerHTML=
        `<thead>
        <tr>
            <td>ID</td>
            <td>SITE</td>
            <td>USUARIO</td>
            <td>SENHA</td>
            <td>DESCRIÇÃO</td>
            <td>OPÇÕES</td>
            </tr>
        </thead>
        <tbody>
        ${tabelaSenhas}
        </tbody>`
        exibeTbl()
        }
        break
    }

}
function btnDelete(){
    document.querySelectorAll('.fa-square-minus').forEach(item=>{
        item.addEventListener('click',deleteItem)
    })
}
function btnUpdate(){
    document.querySelectorAll('.fa-square-pen').forEach(item=>{
        item.addEventListener('click',updateItem)
    })
}

function mostraAdd(){
    elemento.btnAdd.style.visibility='visible';
}
function ocultaAdd(){
    elemento.btnAdd.style.visibility='hidden';
}
function ocultasubmenu(){
 elemento.subMenuItem.forEach(item=>{
     item.style.visibility='hidden';
 })
}
function mostrasubmenu(){
    elemento.subMenuItem.forEach(item=>{
        item.style.visibility='visible';
    })
   }            
function limpaTabela(e){
  elemento.tbl.forEach(item=>{
    if(item.getAttribute('data-id')!=e){
     item.style.display='none';
    }else{
     item.style.display='table';
    }
  })
}


//abrir modal //
function addItem(){
    switch(addInputTbl){
        case 'login':
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            formInput('formLogin');
            elemento.titlemodal.innerHTML="Login"
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';   
        break;
        case 'equipamentos':
            addUpd='newitem';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formEquipamentos');
            elemento.titlemodal.innerHTML="Novo Equipamento"
            maxID(objequipamento);
            elemento.inputID.forEach(item=>{
                item.value=itemMax;
            })
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)       

        break;
        case 'downloads':
            addUpd='newitem';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formDownloads');
            elemento.titlemodal.innerHTML="Novo Download"
            maxID(objdonwloads);
            elemento.inputID.forEach(item=>{
                item.value=itemMax;
            })
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)  
        break;
        case 'telefones':
            addUpd='newitem';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
         setTimeout(()=>{
            formInput('formTelefones');
            elemento.titlemodal.innerHTML="Novo Telefone"
            maxID(objtelefones);
            elemento.inputID.forEach(item=>{
                item.value=itemMax;
            })
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)  
        break;
        case 'senhas':
            addUpd='newitem';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
         setTimeout(()=>{
            formInput('formSenhas');
            elemento.titlemodal.innerHTML="Nova Senha"
            maxID(objsenhas);
            elemento.inputID.forEach(item=>{
                item.value=itemMax;
            })
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)  
        break;
        case 'entrada':
            addUpd='newitem';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
         setTimeout(()=>{
            formInput('formEntrada');
            elemento.titlemodal.innerHTML="Nova Entrada"
            maxID(objentrada);
            elemento.inputID.forEach(item=>{
                item.value=itemMax;
            })
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)  
        break;
        case 'saida':
            addUpd='newitem';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
                    formInput('formSaida');
                    elemento.titlemodal.innerHTML="Nova Saida"
                    maxID(objsaida);
                    elemento.inputID.forEach(item=>{
                        item.value=itemMax;
                    })
                        
                        document.querySelector('#sa2').innerHTML=`<option selected hidden value="-">Selecione o tipo do produto</option>`
                        document.querySelector('#sa3').innerHTML=`<option selected hidden value="-">Selecione a marca do produto</option>`
                        document.querySelector('#sa4').innerHTML=`<option selected hidden value="-">Selecione o modelo do produto</option>`
                        document.querySelector('#eq1').innerHTML=`<option selected hidden value="-">Selecione o tipo do equipamento</option>`
                        document.querySelector('#eq2').innerHTML=`<option selected hidden value="-">Selecione a marca do equipamento</option>`
                        document.querySelector('#eq3').innerHTML=`<option selected hidden value="-">Selecione o modelo do equipamento</option>`
                        document.querySelector('#eq4').innerHTML=`<option selected hidden value="-">Selecione o local do equipamento</option>`
                        document.querySelector('#max').style.visibility='hidden';
                        preenche();

                            

            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
        },1000)
        break;
    }
   }

function preenche(){                     
    let tipo=[]
    objestoque.forEach(element=>{
    tipo[element.Id]=element.tipo;                    
    })
    const unique = [...new Set(tipo)];
    for(let i in unique){
        if(unique[i]!=undefined){
        document.querySelector('#sa2').innerHTML+=`<option value=${unique[i]}>${unique[i]}</option>`
        }
    }
        document.querySelector('#sa2').addEventListener('change',item=>{
            document.querySelector('#sa3').innerHTML=`<option selected hidden value="-">Selecione a marca do produto</option>`
            document.querySelector('#sa4').innerHTML=`<option selected hidden value="-">Selecione o modelo do produto</option>`
            document.querySelector('#max').style.visibility='hidden';
            elemento.formSaida.quantidade.value='';
            var marca =[]
                    objestoque.forEach(element=>{
                    if(element.tipo==item.target.value){
                        marca[element.Id]=element.marca;
                        }
                    })

                    const unique = [...new Set(marca)];
                    for(let i in unique){
                        if(unique[i]!=undefined){
                        document.querySelector('#sa3').innerHTML+=`<option value=${unique[i]}>${unique[i]}</option>`
                        }
                    }
        })
        document.querySelector('#sa3').addEventListener('change',item=>{
                elemento.formSaida.quantidade.value='';
                document.querySelector('#sa4').innerHTML=`<option selected hidden value="-">Selecione o modelo do produto</option>`
                document.querySelector('#max').style.visibility='hidden';
                let modelo =[]
                objestoque.forEach(element=>{
                    if(element.marca==item.target.value && element.tipo== document.querySelector('#sa2').value){
                        modelo[element.Id]=element.modelo;
                        }
                    })
                    const unique = [...new Set(modelo)];
                    for(let i in unique){
                        if(unique[i]!=undefined){
                        document.querySelector('#sa4').innerHTML+=`<option value=${unique[i]}>${unique[i]}</option>`
                        }
                    }
        })
        document.querySelector('#sa4').addEventListener('change',item=>{
            document.querySelector('#max').style.visibility='hidden';
                let quant =[]
                objestoque.forEach(element=>{
                    if(element.modelo==item.target.value && element.tipo== document.querySelector('#sa2').value && element.marca== document.querySelector('#sa3').value){
                        console.log(element)
                        quant[element.Id]=element.quant;
                        }
                    })
                    const unique = [...new Set(quant)];
                    for(let i in unique){
                        if(unique[i]!=undefined){
                            document.querySelector('#max').textContent=`Quantidade máxima: ${unique[i]}`
                            document.querySelector('#max').style.visibility='visible';
                            elemento.formSaida.quantidade.value='';
                            elemento.formSaida.quantidade.setAttribute('max', unique[i])
                        }
                    }
                    

        })
    let tipoEquip=[]
    objequipamento.forEach(element=>{
    tipoEquip[element.Id]=element.tipo;                    
    })
    const uniqueEquip = [...new Set(tipoEquip)];

    for(let i in uniqueEquip){
        if(uniqueEquip[i]!=undefined){
        document.querySelector('#eq1').innerHTML+=`<option value=${uniqueEquip[i]}>${uniqueEquip[i]}</option>`
        }
    }
    document.querySelector('#eq1').addEventListener('change',item=>{
        document.querySelector('#eq2').innerHTML=`<option selected hidden value="-">Selecione a marca do equipamento</option>`
        document.querySelector('#eq3').innerHTML=`<option selected hidden value="-">Selecione o modelo do equipamento</option>`
        document.querySelector('#eq4').innerHTML=`<option selected hidden value="-">Selecione o local do equipamento</option>`

        let marcaEquip=[]
        objequipamento.forEach(element=>{
            if(element.tipo==item.target.value){
                marcaEquip[element.Id]=element.marca;                                    
            }      
        })
        const uniqueEquip = [...new Set(marcaEquip)];
        for(let i in uniqueEquip){
            if(uniqueEquip[i]!=undefined){
            document.querySelector('#eq2').innerHTML+=`<option value=${uniqueEquip[i]}>${uniqueEquip[i]}</option>`
            }
        }
    })
    document.querySelector('#eq2').addEventListener('change',item=>{
        document.querySelector('#eq3').innerHTML=`<option selected hidden value="-">Selecione o modelo do equipamento</option>`
        document.querySelector('#eq4').innerHTML=`<option selected hidden value="-">Selecione o local do equipamento</option>`

        let modeloEquip=[]
        objequipamento.forEach(element=>{
            if(element.marca==item.target.value && element.tipo == document.querySelector('#eq1').value){
                modeloEquip[element.Id]=element.modelo;                                    
            }      
        })
        const uniqueEquip = [...new Set(modeloEquip)];
        
        for(let i in uniqueEquip){
            if(uniqueEquip[i]!=undefined){
            document.querySelector('#eq3').innerHTML+=`<option value=${uniqueEquip[i]}>${uniqueEquip[i]}</option>`
            }
        }
    })
    document.querySelector('#eq3').addEventListener('change',item=>{
        document.querySelector('#eq4').innerHTML=`<option selected hidden value="-">Selecione o local do equipamento</option>`
        let localEquip=[]
        objequipamento.forEach(element=>{
            if(element.modelo==item.target.value && element.tipo == document.querySelector('#eq1').value && element.marca == document.querySelector('#eq2').value){
                localEquip[element.Id]=element.local;                                    
            }      
        })
        const uniqueEquip = [...new Set(localEquip)];
        for(let i in uniqueEquip){
            if(uniqueEquip[i]!=undefined){ 
            document.querySelector('#eq4').innerHTML+=`<option value=${uniqueEquip[i]}>${uniqueEquip[i]}</option>`
            }
        }
    })

}

//parte do modal//
function mudacorinput(input){
    elemento.divEquipamento.forEach(item=>{
        if(item.getAttribute('data-item')==input.target.id){
            item.style.border='1px solid #ba9def'
        }else{
            item.style.border= '1px solid gray';
        }
    })
   
    elemento.iconeEquipamento.forEach(item=>{
        if(item.getAttribute('data-item')==input.target.id){
            item.style.color='#ba9def'
        }else{
            item.style.color= 'gray';
        }
    })
}
function addElement(){
let newid;
switch(addInputTbl){
    case 'login':
        let email = elemento.email.value;
        let password = elemento.password.value; 
        database.login(email, password);
    break;
    case 'equipamentos':
        newid = parseInt(elemento.formEquipamentos.Id.value);
        idofDoc = elemento.formEquipamentos.Id.value.toString() ;
        new_item = {
            Id: newid,
            ip: elemento.formEquipamentos.ip.value,
            local: elemento.formEquipamentos.local.value,
            macaddress: elemento.formEquipamentos.macaddress.value,
            marca: elemento.formEquipamentos.marca.value,
            modelo: elemento.formEquipamentos.modelo.value,
            tipo: elemento.formEquipamentos.tipo.value
        }
        if(addUpd=='newitem'){
            database.crud('add',addInputTbl,idofDoc,new_item);
        }else{
            database.crud('upd',addInputTbl,idofDoc,new_item);
        }
        
        window.alert("Salvo")
        loadAdd();
    break;
    case 'downloads':
        newid = parseInt(elemento.formDownloads.Id.value);
        idofDoc = elemento.formDownloads.Id.value.toString() ;
        new_item = {
            Id: newid,
            nomearquivo: elemento.formDownloads.arquivo.value,
            site: elemento.formDownloads.site.value,
            descricao: elemento.formDownloads.descricao.value,
        }
        if(addUpd=='newitem'){
            database.crud('add',addInputTbl,idofDoc,new_item);
        }else{
            database.crud('upd',addInputTbl,idofDoc,new_item);
        }
        
        window.alert("Salvo")
        loadAdd();
    break;
    case 'telefones':
        newid = parseInt(elemento.formTelefones.Id.value);
        idofDoc = elemento.formTelefones.Id.value.toString() ;
        new_item = {
            Id: newid,
            Colaborador: elemento.formTelefones.nome.value,
            empresa: elemento.formTelefones.empresa.value,
            numero: elemento.formTelefones.numero.value,
        }
        if(addUpd=='newitem'){
            database.crud('add',addInputTbl,idofDoc,new_item);
        }else{
            database.crud('upd',addInputTbl,idofDoc,new_item);
        }
        window.alert("Salvo")
        loadAdd();
    break;
    case 'senhas':
        newid = parseInt(elemento.formSenhas.Id.value);
        idofDoc = elemento.formSenhas.Id.value.toString() ;
        new_item = {
            Id: newid,
            senha: elemento.formSenhas.senha.value,
            site: elemento.formSenhas.site.value,
            usuario: elemento.formSenhas.usuario.value,
            descricao: elemento.formSenhas.descricao.value,

        }
        if(addUpd=='newitem'){
            database.crud('add',addInputTbl,idofDoc,new_item);
        }else{
            database.crud('upd',addInputTbl,idofDoc,new_item);
        }
        window.alert("Salvo")
        loadAdd();
    break;
    case 'entrada':
        newid = parseInt(elemento.formEntrada.Id.value);
        idofDoc = elemento.formEntrada.Id.value.toString();
        let intquant= parseInt(elemento.formEntrada.quantidade.value)
        new_item = {
            Id: newid,
            tipo: elemento.formEntrada.tipo.value,
            marca: elemento.formEntrada.marca.value,
            modelo: elemento.formEntrada.modelo.value,
            empresa: elemento.formEntrada.empresa.value,
            quant: intquant ,
            data_a: elemento.formEntrada.data_a.value,
            marca_modelo:`${elemento.formEntrada.tipo.value}_${elemento.formEntrada.marca.value}_${elemento.formEntrada.modelo.value}`,
        }
        if(addUpd=='newitem'){
            database.crud('add',addInputTbl,idofDoc,new_item);
            maxID(objestoque);
            database.atlEstoque(itemMax,new_item)
            loadAdd();
        }else{
            maxID(objestoque);
            database.updateEstoque(itemMax,objentrada[newx],new_item);
            loadAdd();
        }
        window.alert("Salvo")
    break;
    case 'saida':
        newid = parseInt(elemento.formSaida.Id.value);
        idofDoc = elemento.formSaida.Id.value.toString() ;
        let intquantS= parseInt(elemento.formSaida.quantidade.value)
        new_item = {
            Id: newid,
            tipo: elemento.formSaida.tipo.value,
            marca: elemento.formSaida.marca.value,
            modelo: elemento.formSaida.modelo.value,
            quant: intquantS,
            marca_modelo: `${elemento.formSaida.tipo.value}_${elemento.formSaida.marca.value}_${elemento.formSaida.modelo.value}`,
            data_s: elemento.formSaida.data_s.value,
            tipoE: elemento.formSaida.tipoE.value,
            marcaE: elemento.formSaida.marcaE.value,
            modeloE: elemento.formSaida.modeloE.value,
            localE: elemento.formSaida.localE.value,
            obsE: elemento.formSaida.obsE.value,        }
        if(addUpd=='newitem'){
            database.crud('add',addInputTbl,idofDoc,new_item);
            database.saidaupd(idofDoc,new_item)
        }else{
            database.saidaupd(idofDoc,new_item,objsaida[newid],1)

        }
        window.alert("Salvo")
        loadAdd();
    break;
}
}
function btnCancela(){
 elemento.backmodal.style.display='none';
 elemento.modal.style.display='none';
 elemento.loading.style.display='none';
 elemento.Delete.style.display='none';
 elemento.iconeEquipamento.forEach(item=>{
    item.style.color='gray';
 })
}

function formInput(formId){
    elemento.formu.forEach(item=>{
        if(item.id==formId){
            item.style.display='flex'
            item.style.flexDirection='column'
        }else{
            item.style.display='none'
        }
    })
}
function maxID(itemID){
    if(itemID==null||itemID==undefined){
        itemMax=0
    }else{
        let idarr=[];
        for (let i=0;i<=itemID.length;i++){
            if(itemID[i]==undefined){
                idarr[i]=i;
            }
        }
        itemMax = idarr.reduce(function(a, b) {
            return Math.min(a, b);
          });
    }
}


function deleteItem(x){
    newx= x.target.getAttribute('data-item');
    elemento.backmodal.style.display='flex';
    elemento.Delete.style.display='flex';
    switch(addInputTbl){
        case 'equipamentos':
            elemento.titleDelete.innerHTML=`Deseja realmente apagar o item: <span style='text-decoration: underline; font-size:16px'>${objequipamento[newx].tipo}</span> modelo: <span style='text-decoration: underline; font-size:16px'>${objequipamento[newx].modelo}</span>?`;
        break;
        case 'downloads':
            elemento.titleDelete.innerHTML=`Deseja realmente apagar o item: <span style='text-decoration: underline; font-size:16px'>${objdonwloads[newx].nomearquivo}?`;
        break;
        case 'telefones':
            elemento.titleDelete.innerHTML=`Deseja realmente apagar o telefone do colaborador: <span style='text-decoration: underline; font-size:16px'>${objtelefones[newx].Colaborador}?`;
        break;
        case 'senhas':
            elemento.titleDelete.innerHTML=`Deseja realmente apagar a senha de: <span style='text-decoration: underline; font-size:16px'>${objsenhas[newx].usuario}</span> do site: <span style='text-decoration: underline; font-size:16px'>${objsenhas[newx].site}</span>?`;
        break;
        case 'entrada':
            elemento.titleDelete.innerHTML=`Deseja realmente apagar a Entrada de: <span style='text-decoration: underline; font-size:16px'>${objentrada[newx].marca}</span> <span style='text-decoration: underline; font-size:16px'>${objentrada[newx].modelo}</span><br/><strong>Lembre-se que isso muda seu estoque e suas saidas</strong>?`;
        break;
        case 'saida':
            console.log(newx)
            elemento.titleDelete.innerHTML=`Deseja realmente apagar a saida de: <span style='text-decoration: underline; font-size:16px'>${objsaida[newx].marca}</span>  <span style='text-decoration: underline; font-size:16px'>${objsaida[newx].modelo}</span><br/><strong>Lembre-se que isso muda seu estoque e suas saidas</strong>?`;
        break;
    }
}



 function updateItem(x){
    newx= x.target.getAttribute('data-item');
    switch(addInputTbl){
        case 'equipamentos':
            addUpd='update';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formEquipamentos');
            elemento.titlemodal.innerHTML="Editar Equipamento"
            elemento.inputID.forEach(item=>{
                item.value=newx;
            })
            elemento.formEquipamentos.ip.value=objequipamento[newx].ip,
            elemento.formEquipamentos.local.value=objequipamento[newx].local
            elemento.formEquipamentos.macaddress.value=objequipamento[newx].macaddress
            elemento.formEquipamentos.marca.value=objequipamento[newx].marca
            elemento.formEquipamentos.modelo.value=objequipamento[newx].modelo
            elemento.formEquipamentos.tipo.value=objequipamento[newx].tipo
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)
          break;
        case 'downloads':
            addUpd='update';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formDownloads');
            elemento.titlemodal.innerHTML="Editar Downloads"
            elemento.inputID.forEach(item=>{
                item.value=newx;
            })
            elemento.formDownloads.arquivo.value = objdonwloads[newx].nomearquivo;
            elemento.formDownloads.site.value = objdonwloads[newx].site;
            elemento.formDownloads.descricao.value = objdonwloads[newx].descricao;
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)
        break;
        case 'telefones':
            addUpd='update';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formTelefones');
            elemento.titlemodal.innerHTML="Editar Telefones"
            elemento.inputID.forEach(item=>{
                item.value=newx;
            })
            elemento.formTelefones.nome.value=objtelefones[newx].Colaborador
            elemento.formTelefones.empresa.value=objtelefones[newx].empresa
            elemento.formTelefones.numero.value=objtelefones[newx].numero        
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)
        break;
        case 'senhas':
            addUpd='update';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formSenhas');
            elemento.titlemodal.innerHTML="Editar Senhas"
            elemento.inputID.forEach(item=>{
                item.value=newx;
            })
            elemento.formSenhas.senha.value=objsenhas[newx].senha
            elemento.formSenhas.site.value=objsenhas[newx].site
            elemento.formSenhas.usuario.value=objsenhas[newx].usuario
            elemento.formSenhas.descricao.value=objsenhas[newx].descricao     
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)
        break;
        case 'entrada':
            addUpd='update';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formEntrada');
            elemento.titlemodal.innerHTML="Editar Entradas"
            elemento.inputID.forEach(item=>{
                item.value=newx;
            })
            elemento.formEntrada.tipo.value=objentrada[newx].tipo
            elemento.formEntrada.modelo.value=objentrada[newx].modelo
            elemento.formEntrada.marca.value=objentrada[newx].marca
            elemento.formEntrada.empresa.value=objentrada[newx].empresa 
            elemento.formEntrada.quantidade.value=objentrada[newx].quant
            elemento.formEntrada.data_a.value=objentrada[newx].data_a      
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
         },1000)
        break;
        case 'saida':
            addUpd='update';
            elemento.modal.style.display='none';
            elemento.backmodal.style.display='flex';
            elemento.loading.style.display='flex';
            setTimeout(()=>{
            formInput('formSaida');
            elemento.titlemodal.innerHTML="Editar Saidas"
            elemento.inputID.forEach(item=>{
                item.value=newx;
            })
            elemento.formSaida.tipo.innerHTML= `<option selected hidden value=${objsaida[newx].tipo}>${objsaida[newx].tipo}</option>`
            elemento.formSaida.modelo.innerHTML=`<option selected hidden value=${objsaida[newx].modelo}>${objsaida[newx].modelo}</option>`
            elemento.formSaida.quantidade.value= objsaida[newx].quant
            elemento.formSaida.marca.innerHTML=`<option selected hidden value=${objsaida[newx].marca}>${objsaida[newx].marca}</option>`
            elemento.formSaida.data_s.value=   objsaida[newx].data_s
            elemento.formSaida.tipoE.innerHTML=`<option selected hidden value=${objsaida[newx].tipoE}>${objsaida[newx].tipoE}</option>`
            elemento.formSaida.modeloE.innerHTML=`<option selected hidden value=${objsaida[newx].modeloE}>${objsaida[newx].modeloE}</option>`
            elemento.formSaida.marcaE.innerHTML=`<option selected hidden value=${objsaida[newx].marcaE}>${objsaida[newx].marcaE}</option>`
            elemento.formSaida.localE.innerHTML=`<option selected hidden value=${objsaida[newx].localE}>${objsaida[newx].localE}</option>`
            var opnMarca =[];
            var opnModelo =[];
            var opnMarcaE=[];
            var opnModeloE=[];
            var opnLocalE=[];

            objestoque.forEach(item=>{
                if(item.marca_modelo==objsaida[newx].marca_modelo){
                    let newquant = item.quant+objsaida[newx].quant
                    document.querySelector('#max').textContent=`Quantidade máxima: ${newquant}}`
                    document.querySelector('#max').style.visibility='visible';
                    elemento.formSaida.quantidade.setAttribute('max', newquant)
                    
                }
                if(item.tipo==elemento.formSaida.tipo.value){
                    opnMarca[item.Id]= item.marca
                }
                if(item.marca==elemento.formSaida.marca.value){
                    opnModelo[item.Id]= item.modelo
                }
            })
            let uniqMarca = [...new Set(opnMarca)];
            for(let i in uniqMarca){
                if(uniqMarca[i]!=undefined){
                    elemento.formSaida.marca.innerHTML+=`<option value=${uniqMarca[i]}>${uniqMarca[i]}</option>`
                }
            }
            let uniqModelo = [...new Set(opnModelo)];
            for(let i in uniqModelo){
                if(uniqModelo[i]!=undefined){
                    elemento.formSaida.modelo.innerHTML+=`<option value=${uniqModelo[i]}>${uniqModelo[i]}</option>`
                 }
            }
            objequipamento.forEach(item=>{
                if(item.tipo==elemento.formSaida.tipoE.value){
                    opnMarcaE[item.Id]= item.marca
                }
                if(item.marca==elemento.formSaida.marcaE.value){
                    opnModeloE[item.Id]= item.modelo
                }
                if(item.modelo==elemento.formSaida.modeloE.value){
                    opnLocalE[item.Id]= item.local
                }
            })
            let uniqMarcaE = [...new Set(opnMarcaE)];
            for(let i in uniqMarcaE){
                if(uniqMarcaE[i]!=undefined){
                    elemento.formSaida.marcaE.innerHTML+=`<option value=${uniqMarcaE[i]}>${uniqMarcaE[i]}</option>`
                }
            }
            let uniqModeloE = [...new Set(opnModeloE)];
            for(let i in uniqModeloE){
                if(uniqModeloE[i]!=undefined){
                    elemento.formSaida.modeloE.innerHTML+=`<option value=${uniqModeloE[i]}>${uniqModeloE[i]}</option>`
                 }
            }
            let uniqLocalE = [...new Set(opnLocalE)];
            for(let i in uniqLocalE){
                if(uniqLocalE[i]!=undefined){
                    elemento.formSaida.localE.innerHTML+=`<option value=${uniqLocalE[i]}>${uniqLocalE[i]}</option>`
                 }
            }
            elemento.formSaida.obsE.value=objsaida[newx].obsE
            elemento.loading.style.display='none';
            elemento.modal.style.display='flex';
            preenche()
         },1000)
         
        break;
    }
 }
function loadAdd(){
    elemento.loading.style.display='flex';
    elemento.modal.style.display='none';
    elemento.loading.style.display='flex';
    setTimeout(()=>{
        elemento.backmodal.style.display='none'
        elemento.loading.style.display='none';
    },1000);
}

export default{
    mountTbl,
    afterlogin,
}