module.exports = (hostPlay, rivalPlay, idHost, idRival) => {
    if (hostPlay == rivalPlay) {
        return "tie";
    } else {
        if (hostPlay === "papel") {
            if (rivalPlay === "piedra") {
                return idHost;
            } else {
                if (rivalPlay === "tijera") {
                    return idRival;
                }
            }
            if (hostPlay === "tijera") {
                if (rivalPlay === "piedra") {
                    return idRival;
                } else {
                    if (rivalPlay === "papel") {
                        return idHost;
                    }
                }
            }
            if (hostPlay === "piedra"){
                if (rivalPlay === "tijera"){
                    return idHost
                } else {
                    if (rivalPlay === "papel") {
                        return idRival
                    }
                }
            }
        }
    }
}