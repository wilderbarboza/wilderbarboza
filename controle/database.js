  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
  import {getDatabase, set, ref,onValue, remove, update, child, orderByChild, query, equalTo, get} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
  import {getAuth, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
  import scriptBase from "./script.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA-QgHsQ3LrmUlFVfeDWfEhW-77cuPdY8c",
    authDomain: "cricontrol-f2627.firebaseapp.com",
    databaseURL: "https://cricontrol-f2627-default-rtdb.firebaseio.com",
    projectId: "cricontrol-f2627",
    storageBucket: "cricontrol-f2627.appspot.com",
    messagingSenderId: "205434911487",
    appId: "1:205434911487:web:1fbb909a19e7ff28232aca"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const realtime = getDatabase(app);

 //login
 function login(email, password){
 signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
      console.log('logou com sucesso')
      scriptBase.afterlogin();
      const user = userCredential.user;
     // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     if(errorCode=='auth/user-not-found'){
      let errorDisplay = document.querySelector('.error h2')
      errorDisplay.innerHTML='Usuário não encontrado';
      errorDisplay.style.visibility='visible';
      setTimeout(()=>{
        errorDisplay.style.visibility='hidden';
      },1000)
     }else if(errorCode=='auth/wrong-password'){
      let errorDisplay = document.querySelector('.error h2')
      errorDisplay.innerHTML='Senha invalida';
      errorDisplay.style.visibility='visible';
      setTimeout(()=>{
        errorDisplay.style.visibility='hidden';
      },1000)
     }
  
   })
  }
    //logout
    function logout(){
    signOut(auth).then(() => {
      console.log('saiu')
    }).catch((error) => {
    // An error happened.
    });
    }


    //tabelas//
    function dados(){
    const equipamentos = ref(realtime, 'equipamentos/');
    onValue(equipamentos, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('equipamentos',data)
    });
    const downloads = ref(realtime, 'downloads/');
    onValue(downloads, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('downloads',data)
    });
    const estoque = ref(realtime, 'estoque/');
    onValue(estoque, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('estoque',data)
    });
    const entrada = ref(realtime, 'entrada/');
    onValue(entrada, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('entrada',data)
    });
    const saida = ref(realtime, 'saida/');
    onValue(saida, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('saida',data)
    });
    const telefones = ref(realtime, 'telefones/');
    onValue(telefones, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('telefones',data)
    });
    const senhas = ref(realtime, 'senhas/');
    onValue(senhas, (snapshot) => {
    const data = snapshot.val();
    scriptBase.mountTbl('senhas',data)
    });
  }
    async function crud(h,x,y,z=0){
            if(h=='add'){
              set(ref(realtime, `${x}/` + y),z)
            }else if (h=='del'){
                remove(ref(realtime, `${x}/`+y))
            }else if (h=='upd'){
              update(ref(realtime,`${x}/`+y),z)
            }
          }
      function atlEstoque(idestoque,objestoque){
      let objmarca;
      let newMarca;
      let tipMarMod= objestoque.marca_modelo;
      let {tipo,marca,modelo,empresa,quant,data_a,marca_modelo}=objestoque
      let new_Obj = {Id: idestoque,tipo,marca,modelo,empresa,quant,data_a,marca_modelo}
      const dbMarca= query(ref(realtime,'estoque/'),orderByChild('marca_modelo'), equalTo(`${tipMarMod}`))
      get(dbMarca).then((snapshot) => {
        if (snapshot.exists()) {
          newMarca=snapshot.val();
          if(newMarca.length>1){
            objmarca = newMarca.filter(function (i) {
              return i;
            });
            newMarca = objmarca[0]
            if(newMarca.length>1){
            window.alert('Erro na tabela estoque: Possui Itens DUPLICADOS')
            }else{
              if(newMarca!=undefined){
                let newId=newMarca.Id.toString();
                let nova_quantidade = newMarca.quant+new_Obj.quant
                crud('upd','estoque',newId,{quant: nova_quantidade})
              } else {
              crud('add','estoque',idestoque,new_Obj);
              }
            }
          }else{
              if(newMarca!=undefined){
                let newId=Object.keys(newMarca);
                let nova_quantidade = newMarca[newId].quant+new_Obj.quant
                crud('upd','estoque',newId,{quant: nova_quantidade})
              } else {
              crud('add','estoque',idestoque,new_Obj);
              }
        }
    }else{
      crud('add','estoque',idestoque,new_Obj);
    }
}).catch((error) => {
        console.error(error);
      });
    }

function saidaupd (idsaida,objSaida,objantigo=0,saida=0){
  if(saida==1){
    deleteEstoque('saida',objantigo)
    crud('add','saida',idsaida,objSaida);
  }
  setTimeout(()=>{
      const dbMarca= query(ref(realtime,'estoque/'),orderByChild('marca_modelo'), equalTo(`${objSaida.marca_modelo}`))
      get(dbMarca).then((snapshot) => {
        let objmarca;
        let newMarca;
        if (snapshot.exists()) {
          newMarca=snapshot.val();
          console.log(newMarca)
          if(newMarca.length>1){
            objmarca = newMarca.filter(function (i) {
              return i;
            });
            newMarca = objmarca[0];
            if(newMarca.length>1){
            window.alert('Erro na tabela estoque: Possui Itens DUPLICADOS')
            }else{
              if(newMarca!=undefined){
                let newId=newMarca.Id.toString();
                let nova_quantidade = newMarca.quant-objSaida.quant
                console.log(nova_quantidade)
                crud('upd','estoque',newId,{quant: nova_quantidade})
              }
            }
          }else{
            if(newMarca!=undefined){
              let newId=Object.keys(newMarca);
              let nova_quantidade = newMarca[newId].quant-objSaida.quant
              console.log(nova_quantidade)
              crud('upd','estoque',newId,{quant: nova_quantidade})

          }
        }

        }}).catch()
      },1000)
}


function deleteEstoque(collection,entSaida,remove=0){
  console.log('delete')
  if(collection=='entrada'){
    if(remove==0){
      const idEntrada = entSaida.Id.toString()
      crud('del','entrada',idEntrada);
    }
    const dbEntrada = entSaida.marca_modelo
    const dbMarca= query(ref(realtime,'entrada/'),orderByChild('marca_modelo'), equalTo(`${dbEntrada}`))
    get(dbMarca).then((snapshot) => {
    if (snapshot.exists()) {
                  const dbEstoque= query(ref(realtime,'estoque/'),orderByChild('marca_modelo'), equalTo(`${dbEntrada}`))
                  get(dbEstoque).then((snapshot) => {
                  if (snapshot.exists()) {
                                  let newMarca;
                                  newMarca=snapshot.val();
                                  if(newMarca.length>1){
                                    let objmarca = newMarca.filter(function (i) {
                                      return i;
                                    });
                                    newMarca = objmarca[0]
                                    if(newMarca.length>1){
                                    window.alert('Erro na tabela estoque: Possui Itens DUPLICADOS')
                                    }else{
                                      if(newMarca!=undefined){
                                        let newId=newMarca.Id.toString();
                                        let nova_quantidade = (newMarca.quant)-(entSaida.quant)
                                        crud('upd','estoque',newId,{quant: nova_quantidade})
                                      }
                                    }
                                  }else{
                                    if(newMarca!=undefined){
                                      let newId=Object.keys(newMarca);
                                      let nova_quantidade = (newMarca[newId].quant)-(entSaida.quant)
                                      crud('upd','estoque',newId,{quant: nova_quantidade})
                                    }
                                  }}}).catch((error) => {
                                    console.error(error);
                                  });
      } else {
      const dbEstoque= query(ref(realtime,'estoque/'),orderByChild('marca_modelo'), equalTo(`${dbEntrada}`))
      get(dbEstoque).then((snapshot) => {
      if (snapshot.exists()) {
                      let newMarca;
                      newMarca=snapshot.val();
                      if(newMarca.length>1){
                        let objmarca = newMarca.filter(function (i) {
                          return i;
                        });
                        newMarca = objmarca[0]
                        if(newMarca.length>1){
                        window.alert('Erro na tabela estoque: Possui Itens DUPLICADOS')
                        }else{
                          if(newMarca!=undefined){
                            let newId=newMarca.Id.toString();
                            crud('del','estoque',newId)
                          }
                        }
                      }else{
                        if(newMarca!=undefined){
                          let newId=Object.keys(newMarca);
                          crud('del','estoque',newId)
                        }
                      }
                    }
                  }).catch((error) => {
                        console.error(error);
                      });
    }
    }).catch((error) => {
      console.error(error);
    });
}else{
  if(remove==0){
    console.log("esta no remove")
    const idsaida = entSaida.Id.toString()
    crud('del','saida',idsaida);
  }
    const dbsaida = entSaida.marca_modelo
    const dbEstoque= query(ref(realtime,'estoque/'),orderByChild('marca_modelo'), equalTo(`${dbsaida}`))
                  get(dbEstoque).then((snapshot) => {
                  if (snapshot.exists()) {
                                  let newMarca;
                                  newMarca=snapshot.val();
                                  if(newMarca.length>1){
                                    let objmarca = newMarca.filter(function (i) {
                                      return i;
                                    });
                                    newMarca = objmarca[0]
                                    if(newMarca.length>1){
                                    window.alert('Erro na tabela estoque: Possui Itens DUPLICADOS')
                                    }else{
                                      if(newMarca!=undefined){
                                        let newId=newMarca.Id.toString();
                                        let nova_quantidade = (newMarca.quant)+(entSaida.quant)
                                        crud('upd','estoque',newId,{quant: nova_quantidade})

                                      }
                                    }
                                  }else{
                                    if(newMarca!=undefined){
                                      let newId=Object.keys(newMarca);
                                      let nova_quantidade = (newMarca[newId].quant)+(entSaida.quant)
                                      crud('upd','estoque',newId,{quant: nova_quantidade})
                                    }
                                  }
                                }
                              }).catch((error) => {
                                    console.error(error);
                                  });
                            }
                          }



function updateEstoque(idestoque,entradaAntiga, EntradaNova){
  if(entradaAntiga.marca_modelo!=EntradaNova.marca_modelo){
    let newId = entradaAntiga.Id.toString();
    crud('upd','entrada',newId,EntradaNova)
    deleteEstoque('entrada',entradaAntiga);
    atlEstoque(idestoque,EntradaNova)
    }else{
    let newId = entradaAntiga.Id.toString();
    crud('upd','entrada',newId,EntradaNova)
    const dbEstoque= query(ref(realtime,'estoque/'),orderByChild('marca_modelo'), equalTo(`${EntradaNova.marca_modelo}`))
    get(dbEstoque).then((snapshot) => {
    if (snapshot.exists()) {
                    let newMarca;
                    newMarca=snapshot.val();
                      if(newMarca!=undefined){
                        let newId=Object.keys(newMarca);
                          let newquant = (EntradaNova.quant-entradaAntiga.quant)
                          newquant = newMarca[newId].quant+newquant
                        crud('upd','estoque',newId,{quant: newquant})
                      }
                    }}).catch((error) => {
                      console.error(error);
                    });
        }
}
    export default {
      saidaupd,
      updateEstoque,
      deleteEstoque,
      atlEstoque,
      crud,
      logout,
      login,
      dados,
    }