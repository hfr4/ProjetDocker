const bufferToBase64PngUrlString =  (buffer) => {
    var binary = ''
    var bytes  = new Uint8Array(buffer)
    for (var i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return 'data:image/png;base64,' + btoa(binary)
}

const durationToString = (num) => {
    var hours   = Math.floor(num / 3600)
    var minutes = Math.floor((num - 3600 * hours) / 60)
    var seconds = num % 60
    
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    
    if (hours > 1) {
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        return hours + ":" + minutes + ":" + seconds
    } else {
        return minutes + ":" + seconds       
    }
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

const setCookie = (name, value) => {
    document.cookie = name +'='+ value +'; Path=/; SameSite=Lax;'
}

const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;'
}
    
const loggedIn = () => {
    return getCookie('token')
}

export const utils = {
    bufferToBase64PngUrlString,
    durationToString,
    loggedIn,
    getCookie,
    setCookie,
    deleteCookie,
}
