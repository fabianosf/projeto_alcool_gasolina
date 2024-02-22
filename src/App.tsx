import { useState, FormEvent } from 'react'
import './App.css';
import logoImg from './assets/logo.png'

/* Calculadora: alcool / gasolina
E se o resultado for menor que 0.7 compensa usar o alcool
*/

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}


function App() {   

  const [gasolinaInput, setGasolinaInput] = useState<number>(0)
  const [alcoolInput, setAlcoolInput] = useState<number>(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault();
    const calculo = (alcoolInput / gasolinaInput)
    console.log(calculo)

    if(calculo <= 0.7){
      setInfo({
        title: 'Compensa usar alcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }else{
      setInfo({
        title: 'Compensa usar gasolina',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString('pt-br',{
      style: 'currency',
      currency: 'BRL'
    })
    return valorFormatado;
  }

  return (
    <div>
      <main className='container'>
        <img className='logo' src={logoImg}  alt='Logo de calculadora ou gasolina'/>
        <h1 className='title'>Qual a melhor opção ?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Alcool (preço por litro):</label>
          <input className='input' type="number" 
          placeholder='4,90' min='1' step='0.01' 
          required value={alcoolInput} onChange={(e) => setAlcoolInput(Number(e.target.value))}/>
          <br />
          <label>Gasolina (preço por gasolina):</label>
          <input className='input' type="number" 
          placeholder='4,90' min='1' step='0.01' 
          required value={gasolinaInput} onChange={(e) => setGasolinaInput(Number(e.target.value))}/>

          <input className='button' type="submit" value='Calculadora' />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className='result'>
          <h2 className='result-title'>
            {info.title}
          </h2>

          <span> Alcool R$: {info.alcool}</span>
          <span>Gasolina R$: {info.gasolina}</span>
        </section>

        )}
        
      </main>
    </div>
  )
}

export default App
