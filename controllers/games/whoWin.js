module.exports = (hostPlay, rivalPlay, idHost, idRival) => {
    if (hostPlay === rivalPlay) {
        return "tie";
    } else {
        switch(hostPlay){
            case "papel":
                if (rivalPlay === "piedra") {
                    return idHost
                } else {
                    return idRival
                }
            case "tijera": 
                if (rivalPlay === "papel") {
                    return idHost
                } else {
                    return idRival
                }
            case "piedra": 
                if (rivalPlay === "tijera") {
                    return idHost
                } else {
                    return idRival
                }
            default:
                return hostPlay
            }
        }
    }