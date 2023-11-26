
const apiUrl = "https://demo7598644.mockable.io/promotion"

let title, message, backgroundColorApi, fontColorApi, linkApi, targetBlankApi

ButtonInvisible();


// Busca dados da API
async function FetchData() {

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();
    
            for (const item of data) {
                const dateEnd = new Date(item.dateEnd);
                const dateStart = new Date(item.dateStart);
                const date = new Date('2023-10-21T03:00:00Z');
                
                // const date = new Date();
                // date.setHours(0, 0, 0, 0);

                const timeDateEnd = dateEnd.getTime();
                const timeDateStart = dateStart.getTime();
        
                if (timeDateEnd >= date && timeDateStart <= date) {
                    const highlightObj = JSON.parse(item.highlight);
                    backgroundColorApi = highlightObj.bgColor;
                    fontColorApi = highlightObj.fontColor;
                    title = item.title;
                    message = item.message;
                    linkApi = item.url;
                    targetBlankApi = item.targetBlank;
        
                    const pElementTitle = document.getElementById("title");
                    pElementTitle.textContent = title

                    const pElementMessage = document.getElementById("information")
                    pElementMessage.textContent = message

                    const hrefElement = document.getElementById("href")
                    hrefElement.href = linkApi
                    
                    FontLimit();
                    StyleApi();
                    OpenWindow();
                    return;
                }
            }    
        }

        else {
            console.error('Erro ao obter os dados da API', response)
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
    }

}

FetchData();

// Deixar o botão invisivel
function ButtonInvisible(){
    const buttonInvisble = document.getElementById('childer-button')
    buttonInvisble.style.display = "none";
}

// Implementação da lógica de abrir ou não a nova pagina do Link
function targetBlank(event){
    event.preventDefault();
    if (targetBlankApi) {
        window.open(document.getElementById('href').getAttribute('href'), '_blank');
    } else {
        window.location.href = document.getElementById('href').getAttribute('href');
    }
}

// Limita a quantidade de caracteres do modal e no final coloca 3 pontos.
function FontLimit(){
    const pElement = document.querySelectorAll(".information")
    const LIMIT = 135
    
    for (let p of pElement){
        const aboveLimit = p.innerText.length > LIMIT
        const dots0rEmpty = aboveLimit ? '...' : ''
        p.innerText = p.innerText.substring(0, LIMIT) + dots0rEmpty
    }
}

// Implementação do stilo conforme dados da API
function StyleApi(){
    const elementWindow = document.getElementById("window")
    const elementButtonClose = document.getElementById("close")
    const pElements = document.querySelectorAll("#title , #information, #href")

    elementWindow.style.backgroundColor = backgroundColorApi
    elementButtonClose.style.backgroundColor = backgroundColorApi
    console.log(pElements)
    Array.from(pElements).forEach(element => {
        element.style.color = fontColorApi;
    });
}

// Abertura e fechamento do modal
function OpenWindow() {
    const modal = document.getElementById('window');
    modal.classList.add('open');
    ButtonInvisible();

    function closeModal(e) {
        const closeButton = document.getElementById('close');
        const container = document.getElementById('container');

        if (e.target === closeButton || e.target === container) {
            modal.classList.remove('open');
            document.removeEventListener('click', closeModal);

            const buttonVisible = document.getElementById('childer-button')
            buttonVisible.style.display = "block";
        }
    }

    document.addEventListener('click', closeModal);
}

