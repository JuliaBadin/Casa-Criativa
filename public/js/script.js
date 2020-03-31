function onOff(){ //adiciona o click
    document
        .querySelector("#modal") //procura onde está a função
        .classList
        .toggle("hide") //coloca e tira a class hide e toda a sua formatação

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal") 
        .classList
        .toggle("addScroll") 
}

function checkFields(event){

    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link"
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof event.target[value].value == "string"
        const checkIfIsEmpty = !event.target[value].value.trim() //limpa os espaços, true se for vazio e false se tiver outros caracteres
        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault() //evita o padrão, no caso enviar o form
        alert("Por favor, preencha todos os campos")
    }

}