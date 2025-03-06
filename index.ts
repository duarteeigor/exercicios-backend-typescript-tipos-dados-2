const fs = require('fs');

type User = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endreco : Endereco | null
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

const lerArquivo = (): unknown =>{
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escreverArquivo = (info: any): void =>{
    fs.writeFileSync('./bd.json', JSON.stringify(info));
}

const cadastrarUsuario = (usuario: User) : User =>{
    const insertBd = lerArquivo() as User[];
    insertBd.push(usuario);
    escreverArquivo(insertBd);
    return usuario
}

const listarUsuario = (filtro?: string): User[] =>{
    const bd = lerArquivo() as User[];

    const resultado = bd.filter(user =>{
        if(filtro){
            return user.profissao == filtro
        }
       return bd
    });

    return resultado
}

const detalharUsuario = (cpf: string): User =>{
    const bd = lerArquivo() as User[];
    const usuario = bd.find(user =>{
        return user.cpf == cpf
    })
    if(!usuario){
        throw new Error('usuario nao encontrado')
    }
    return usuario;
}

const atualizarUsuario = (cpf: string, dados: User): User =>{
    const bd = lerArquivo() as User[];
    const usuario = bd.find(user =>{
        return user.cpf == cpf
    })
    if(!usuario){
        throw new Error("Usuario nao encontrado")
    }

    Object.assign(usuario, dados); //SOBRESCREVENDO O OBJETO
    
    escreverArquivo(bd);

    return dados;
}

const deletarUsuario = (cpf: string): User =>{
    const bd = lerArquivo() as User[];
    const usuario = bd.find(user => {
      return user.cpf == cpf
    });

    if(!usuario){
        throw new Error('Usuario nao pode ser encontrado')
    }

    const exclusao = bd.filter(user =>{
        return user.cpf !== cpf
    })

    escreverArquivo(exclusao)

    return usuario;
}

// cadastrarUsuario({
//     nome: "Pedro",
//     email: "pedro@email.com",
//     cpf: "12345678933",
//     endreco: {
//         cep: "33332254",
//         rua: "Rua X",
//         bairro: "Centro",
//         cidade: "Ipatinga"
//     }
// });

// atualizarUsuario("12345678900", {
//     nome:"felicia",
//     email:"felicia@email.com",
//     cpf:"12345678900",
//     profissao: "Corretora",
//     endreco:{
//         cep:"33332254",
//         complemento: "apto 202",
//         rua:"Rua X",
//         bairro:"Centro",
//         cidade:"Ipatinga"
//     }
// });

// deletarUsuario("12345678933")

// const consulta = detalharUsuario("12345678922");
const bd = lerArquivo()
console.log(listarUsuario("Corretora"))