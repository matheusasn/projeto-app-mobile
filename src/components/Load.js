import React from 'react'
import { View, StyleSheet, ActivityIndicator} from 'react-native'

export function Load(){
    return(
        <View             
            style={styles.container}
        >
            <ActivityIndicator color="#fff"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation: {
        backgroundColor: 'transparent',
    }
})