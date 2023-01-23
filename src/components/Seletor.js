import React, { useState } from "react";

import { Picker } from '@react-native-picker/picker';
import { Text, View, StyleSheet } from "react-native";

export default function Seletor({moedas, onChange, coinSelecionada}){    
    const [arrayMoedas, setArrayMoedas] = useState(moedas)
    
    
    let arrayMoedasB = moedas.map((key) => {
        return <Picker.Item key={key.key} value={key.value} label={key.label} />
        
    })

    return(
        <View>
            <Picker
                selectedValue={ coinSelecionada }
                onValueChange={ (itemValue, value) => onChange(itemValue) }
                style={styles.seletor}
                placeholder={'Selecione uma moeda'}
            >          
            <Picker.Item label={'Selecione sua moeda'} value={''} enabled={false} color={'#DCDCDC'} /> 
            {arrayMoedasB}     

            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    seletor:{       
       width: "100%",
    }
})