export const IntToCategory  = (categoryId:number) => {
    
    switch (categoryId){
        case 1:
            return "abajururi-din-lemn"
        case 2:
            return "aplice-de-perete"
        case 3:
            return "articole-sezoniere"
        case 4:
            return "becuri"
        case 5:
            return "lampadare-de-podea"
        case 6:
            return "pendule"
        case 7:
            return "tablouri-din-lemn"
        case 8:
            return "lampi-de-masa"
    }
}