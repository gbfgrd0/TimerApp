// Imports
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

// Declaração de variaveis

let timer = null;
let m = 0;
let s = 0;
let h = 0;

// Código da interface
export default function App() {

  // Declaração de estados

  const [start,setStart] = useState("Start")
  const [tempo, setTempo] = useState("00:00:00")
  const [ultimo, setUltimo] = useState('')

  // Funções
  
  function Contando(){
    if(timer !== null){
      // Ao pausar o cronometro...
      clearInterval(timer);
      setStart("Start");
      timer = null;
    }else{
      // Ao rodar o cronometro...
      timer = setInterval(()=>{
        s++
        if(s==60){
          m++;
          s = 0;
        }
        if(m == 60){
          h++
          m = 0;
        }
        if(h == 24){
          alert("Meu Deus! Como você conseguiu? Você ficou 24 horas com o cronometro ligado...")
          s = 0;
          m = 0;
          h = 0;
        }
        let horario = 
        (h<10? "0" + h: h) + ":" +
        (m<10? "0" + m : m)+ ":" +
        (s<10? "0" + s: s) 
        
        setTempo(horario)
      },1000)
      setStart("Pause")
    }
  }

  function Clear(){
    setUltimo(`Seu último tempo foi: ${tempo}`)
    clearInterval(timer);
    setStart("Start");
    timer = null;
    setTempo("00:00:00")
    m = 0;
    h = 0;
    s = 0;
  }
 
  
  return (

    // Cronometro
    <View style={style.container}>
      <LinearGradient style={{ height: 400, width: 500, marginTop: -390, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 80, borderBottomRightRadius: 80 }} colors={['#A62A5C', '#6A2597']}>
        <View style={style.contador}>
          <Text style={style.textoContagem}>{tempo}</Text>
        </View>
      </LinearGradient>
      <Text style={style.textoUltimo}>{ultimo}</Text>
      <View style={style.botoesContainer}>
        <TouchableOpacity onPress={Contando} style={[style.botoes, { marginRight: 40 }]}>
          <Text style={style.botaoTexto}>{start}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Clear} style={style.botoes}>
          <Text style={style.botaoTexto}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
// Código do design
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contador: {
    borderWidth: 7,
    borderColor: 'white',
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botoesContainer: {
    position: 'absolute',
    top: 580,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  botoes: {
    height: 80,
    width: 80,
    borderColor: '#A62A5C',
    borderWidth: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#A62A5C',
    fontWeight: 700
  },
  textoContagem: {
    fontSize: 40,
    color: 'white'
  },
  textoUltimo:{
    color:'#A62A5C',
    fontSize: 22,
    fontWeight: 700,
    position: 'absolute',
    top: 430,
  }
})
