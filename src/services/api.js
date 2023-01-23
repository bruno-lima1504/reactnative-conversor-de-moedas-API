import axios from "axios"

// https://economia.awesomeapi.com.br/json/

// all/EUR-BRL rota para buscar euro para real

 const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json/'
   
})

export {api};
