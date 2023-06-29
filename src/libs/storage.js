import AsyncStorage from '@react-native-async-storage/async-storage'

export async function saveUserInfo(data) {

    const data_string = JSON.stringify({...data})
    try {
        await AsyncStorage.setItem('@saude-de-verdade:user', data_string)
    }catch(error) {
        throw new Error(error)
    }
}

export async function loadUserInfo() {
    try {
        const data = await AsyncStorage.getItem('@saude-de-verdade:user')
        return data ? JSON.parse(data) : {}
    }catch(error) {
        throw new Error(error)
    }
}

export async function removeUserInfo() {
    try {
        await AsyncStorage.setItem('@saude-de-verdade:user', {})
    }catch(error) {
        throw new Error(error)
    }
}


export async function save(key, data) {
    const data_string = JSON.stringify({...data})
    try {
        await AsyncStorage.setItem(`@saude-de-verdade:${key}`, data_string)
    }catch(error) {
        throw new Error(error)
    }
}

export async function load(key) {
    try {
        const data = await AsyncStorage.getItem(`@saude-de-verdade:${key}`)
        return data ? JSON.parse(data) : {}
    }catch(error) {
        throw new Error(error)
    }
}

export async function remove(key) {
    try {
        await AsyncStorage.setItem(`@saude-de-verdade:${key}`, {})
    }catch(error) {
        throw new Error(error)
    }
}