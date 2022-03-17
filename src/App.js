import { useState } from 'react' // useState é um hook do react (existem vários hooks)

function App() {
  const [city, setCity] = useState("")
  // 1º - O primeiro nome é uma variável onde será armazenado o que digitado. O segundo nome é a função reposável por armazaenar o que foi digitado na variável.

  const [previsaoTempo, setPrevisaoTempo] = useState(null) 
  // 11º - Esse segundo estado serve para armazenar os dados que foram retornados pela requisição http da API.
  // Tem que colocar ele como null.

  const handleChange = (e) => {
    setCity(e.target.value) // 6º - O setCity vai capturar o que o usuário digitou e armazenar na variável city.
    // 4º - console.log('Alterou') = serve para testar se a função está funcionando quando algo é digitado. (Olhar no console).
    // 5º - O e.target.value serve para saber quais os caracteres que foram digitados.
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=2e13aaa5c4b4400f9e2224617221603&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status == 200){
        return response.json()
      }
    })

    // 9º - A requisição só dar certo quando aparece o status 200 detro no response, por isso foi criado esse if e o json é para transformar tudo em json.
    // O .then é necessário pois é necessário, pois não se sabe o tempo do conteúdo que irá ser retornado.

    .then((data) => {
      console.log(data)
      setPrevisaoTempo(data) // 10º - Aqui você está pegando apenas os dados, esses dados é o que nos interessa, e aramazenado dentro da variável previsaoTEmpo.
    })
  } // 7º - Essa nova função é criada para fazer a requisição http na api.
    // O fetch vem do javaScript e serve para fazer requisições http.
    // Dentro do fetch você coloca a base URL e os parâmetros necessários.
    // As requisições são promessas, pois não se sabe o que será retornado. Por tanto, no final é necessário colocar o .then junto com o response criadno umka função.



  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a href="#" className="navbar-brand">Previsão do Tempo</a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua cidade</h1>
          <p className="lead">Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar!</p>

          <div className="row mb-4">
            <div className="col md-6">
              <input 
                onChange={handleChange} // 3º - Toda vez que mudar algo no input a função handleChange será chamada automaticamente.
                className="form-control" type="text" 
                value={city}/>
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">Pesquisar</button>

         {
           previsaoTempo ? (
            <div>
            <div className='mt-4 d-flex align-items-center'>
              <div>
                <img src={previsaoTempo.current.condition.icon} alt="ícone" />
              </div>

              <div>
                <h3>O tempo atual é: {previsaoTempo.current.condition.text}</h3>
                <p>Temperatura: {previsaoTempo.current.temp_c}ºC</p>
              </div>
            </div>
          </div>
           ) : null}


        </div>
      </main>
    </div>
  );
}

export default App;


// 2º - No input coloque o value e o nome da variável.

// Após o 6º passo chegou a hora de começar a fazer a requisição http da api. A reuisição começa no 7º passo criando uma nova const.

// 8º - Coloque o onclick no botão chamando a função handleSearch que irá fazer a requisição automaticamente.

// 12º - É necessário criar uma condição para que as informações e os ícones sejam mostradas. (A condição foi criado nessa última parte do HTML, onde tem previsaoTempo?)

