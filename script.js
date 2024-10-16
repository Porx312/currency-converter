// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    const $select1 = document.querySelector("#select1");
    const $select2 = document.querySelector("#select2");
    const btn = document.querySelector(".btn");
    const input = document.querySelector(".input")
    const convertText = document.querySelector(".convert-text")
    const exchangeApi = async () => { 
        const response = await fetch("https://v6.exchangerate-api.com/v6/d939c7b79c1ab0a035e65b9c/latest/USD");
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error en la solicitud a la API");
        }
    };

    exchangeApi()
        .then(data => {
            // Iterar sobre las tasas de cambio y llenar ambos selects
            const rates = Object.keys(data.conversion_rates).map(item => ({nombre: item, valor: data.conversion_rates[item]}));
            console.log(rates)
            rates.map(item => {
                $select1.innerHTML += `<option value="${item.valor} ">${item.nombre}</option>`;
                $select2.innerHTML += `<option value="${item.valor} ">${item.nombre}</option>`;

            });

        }) 
        .catch(error => console.error(error));

        $select2.addEventListener("click", ()=> {
            convertText.textContent = `${$select2.value} `
        })
        $select1.addEventListener("click", () => {
            input.placeholder = `${$select1.value} `
        })
        btn.addEventListener("click", () => {
            const resultado = parseFloat(input.value) * parseFloat($select2.value);
            convertText.textContent = resultado.toString();
        });
});
