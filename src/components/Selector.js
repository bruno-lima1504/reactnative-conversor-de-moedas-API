import React from "react";

import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from "react-native";

export default function Selector({coins, onChange, coinSelected}){
    
    let arrayCoinsB = coins.map((key) => {
        return <Picker.Item key={key.key} value={key.value} label={key.label} />
        
    })

    return(
        <View>
            <Picker
                selectedValue={ coinSelected }
                onValueChange={ (itemValue, value) => onChange(itemValue) }
                style={styles.seletor}
                placeholder={'Selecione uma moeda'}
            >          
            <Picker.Item label={'Selecione sua moeda'} value={''} enabled={false} color={'#DCDCDC'} /> 
            {arrayCoinsB}     

            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    seletor:{       
       width: "100%",
    }
})