export const CategoryToInt  = (categoryId:string) => {
    if(categoryId.trim().toLowerCase() === "")
        return 0;
    switch (categoryId.trim().toLowerCase()){
        case "abajururi-din-lemn":
            return 1;
        case "aplice-de-perete":
            return 2;
        case "articole-sezoniere":
            return 3;
        case "becuri":
            return 4;
        case "lampadare-de-podea":
            return 5;
        case "pendule":
            return 6;
        case "tablouri-din-lemn":
            return 7;
        case "lampi-de-masa":
            return 8;
        default:
            return 0;
    }
}