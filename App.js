import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';

import Selector from './src/components/Selector';
import { api } from './src/services/api';

export default function App() {
  const [ coins, setCoins] = useState([]);
  const [ loading, setLoading ]  = useState(true);

  const[coinSelected, setCoinsSelected] = useState(null);
  const[coinBValue, setCoinBValue] = useState(0);

  const [coinValue, setCoinValue] = useState(null);
  const [convertedValue, setConvertedValue] = useState(0);


  useEffect(()=>{
    async function loadCoins(){
      const response = await api.get('all');      
      
      let arrayCoins = []
      Object.keys(response.data).map((key)=>{
        arrayCoins.push({
          key: key,
          label: key,
          value: key
        })
      })

      setCoins(arrayCoins);
      setLoading(false);         
    }
    loadCoins();
    
  },[]);

  async function toConvert(){
    if(coinSelected === null || coinBValue === 0){
      alert('Por favor selecione uma moeda.');
      return;
    }    
    //USD-BRL ele devolve quanto é 1 dolar convertido pra reais
    const response = await api.get(`all/${coinSelected}-BRL`);
    let result = (response.data[coinSelected].ask * parseFloat(coinBValue) );
    setConvertedValue(`R$ ${result.toFixed(2)}`);
    setCoinValue(coinBValue)
    
    Keyboard.dismiss();
  }

  if(loading){
    return (       
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color="#FFF" size={45} />
      </View>
    )
  }else{
    return (
      <View style={styles.container}>
  
        <View style={styles.coinArea}>
          <Text style={styles.title}>Selecione sua moeda</Text>
          <Selector coins={coins} onChange={ (coin) => setCoinsSelected(coin)  } coinSelected={coinSelected}/>
        </View>
  
        <View style={styles.valueArea}>
          <Text style={styles.title}>Digite um valor para converter em (R$)</Text>
          <TextInput 
          placeholder= "EX: 150"
          style={styles.input}
          onChangeText={ (value) => setCoinBValue(value) }        
          keyboardType="numeric"
          />
        </View>
  
        <TouchableOpacity 
          style={styles.buttonArea}
          onPress={toConvert} >
          <Text style={styles.buttonText}>Converter</Text>
        </TouchableOpacity>
  
        {convertedValue !== 0 && (
        <View style={styles.resultArea}>
          <Text style={styles.convertedValue}>
            {coinValue} {coinSelected}
          </Text>
          <Text style={[styles.convertedValue, { fontSize: 18, margin: 10 }]}>
            Corresponde a
          </Text>
          <Text style={styles.convertedValue}>
            {convertedValue}
          </Text>
        </View>
         )}  
      </View>  
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    alignItems: 'center',
    marginTop: 35,    
    paddingTop: 40,
  },
  coinArea:{
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingTop: 9,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    marginBottom: 1
  },
  title:{
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5,
  },
  valueArea:{
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingBottom: 9,
    paddingTop: 9
  },
  input:{
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  buttonArea:{
    width: '90%',
    backgroundColor: '#FB4B57',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  resultArea:{
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  convertedValue:{
    fontSize: 39,
    fontWeight: 'bold',
    color: '#000'
  }
});
