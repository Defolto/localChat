const wrapper = document.querySelector(".wrapper")
const input = document.querySelector("input")
const button = document.querySelector("button")

const HISTORY_ID = 'history-id'

const history = JSON.parse(localStorage.getItem(HISTORY_ID)) 
if (history && history.length) {
    history.forEach(mes => {
        wrapper.insertAdjacentHTML('beforeend', `<div class="${mes.who}">
        <p>${mes.text}</p>
        <p>${mes.time}</p>
    </div>`)
    });
}

let who = "me"

function sendMessage() {
    const text = input.value

    if (!text) {
        return
    }

    input.value = ''
    const now = new Date()
    const minutes = now.getMinutes()
    const hours = now.getHours()
    const time = `${hours}:${minutes}`

    wrapper.insertAdjacentHTML("beforeend", `<div class="${who}">
    <p>${text}</p>
    <p>${time}</p>
</div>`)

    let oldHistory = JSON.parse(localStorage.getItem(HISTORY_ID))
    oldHistory = oldHistory ? oldHistory : []
    oldHistory.push({
        who,
        text,
        time
    })
    localStorage.setItem(HISTORY_ID, JSON.stringify(oldHistory))
}

button.addEventListener('click', sendMessage)
addEventListener('keypress', (e)=>{
    if (e.key === "Enter") {
        sendMessage()
    }

    if (e.key === "Z" && e.shiftKey) {
        who = who === "me" ? "you" : "me"
        alert(`Вы пишите от ${who}`)
    }
})