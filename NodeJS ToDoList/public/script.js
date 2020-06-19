let ulTasks = $('#ulTasks')
let ulTasks2 = $('#ulTasks2')
let ulTasks3 = $('#ulTasks3')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let btnSort = $('#btnSort')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#form1')
let inpNewTask2 = $('#form11')
let inpDes = $('#form2')
let inpDue = $('#datepicker')
let inpStat = $('#form4')
let inpPrio = $('#form5')

function addItem() {
    // addItem2(this)
    let listItem = $('<li>', {
        'class': 'list-group-item',
        text: inpNewTask.val()
    })
    listItem.click(() => {
        listItem.toggleClass('done')
    })
    ulTasks.append(listItem)
    const x = listItem
    inpNewTask.val('')
    toggleInputButtons()
    addTodos()
    addNotes()

}
async function addTodos() {
    var task = {
        title: document.getElementById('form1').value,
        description: document.getElementById('form2').value,
        priority: document.getElementById('form5').value,
        due: document.getElementById('datepicker').value
    }

    const resp = await fetch('/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    alert("New task added")

}

function clearDone() {
    $('#ulTasks .done').remove()
    toggleInputButtons()
}

function sortTasks() {
    $('#ulTasks .done').appendTo(ulTasks)
}

function toggleInputButtons() {
    btnReset.prop('disabled', inpNewTask.val() == '')
    btnAdd.prop('disabled', inpNewTask.val() == '')
    btnSort.prop('disabled', ulTasks.children().length < 1)
    btnCleanup.prop('disabled', ulTasks.children().length < 1)
}

inpNewTask.keypress((e) => {
    if (e.which == 13) addItem()
})
inpNewTask.on('input', toggleInputButtons)

btnAdd.click(addItem)
btnReset.click(() => {
    inpNewTask.val('')
    toggleInputButtons()
})
btnCleanup.click(clearDone)
btnSort.click(sortTasks)

//--------------------------------
let today = new Date();
today.setDate(today.getDate() + 1);
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd
document.getElementById("datepicker").value = today


function addNotes() {
    var div = document.createElement("div")
    div.classList = "input-group mb-3"

    var inp = document.createElement("input")
    inp.type = "text"
    inp.class = "form-control"
    inp.id = "inputval"
    inp.placeholder = "Notes"

    var div2 = document.createElement("div")
    div2.class = "input-group-append"

    var but = document.createElement("button")
    but.classList.add('btn', 'btn-outline-secondary')
    but.type = "button"
    but.id = "button-addon2"
    but.innerText = "Done"
    but.onclick = addNotes2

    let listItem2 = $('<li>', {
        'class': 'list-group-item',
    })

    div2.append(but)
    div.append(inp)
    div.append(div2)
    listItem2.append(div)
    ulTasks2.append(listItem2)
}

function addNotes2() {
    var listItems = document.getElementById("ulTasks2").getElementsByTagName("li");
    var last = listItems[listItems.length - 1];
    let valueofnote = document.getElementById("inputval").value

    let listItem3 = $('<li>', {
        'class': 'list-group-item',
        text: "Note : " + valueofnote
    })
    ulTasks3.append(listItem3)
    last.parentNode.removeChild(last);
    addNotes()

}


// addItem2() {
//     console.log(this.form1.value)
//     console.log(this.form1)
//     console.log(this)

//     function reqListener() {
//         console.log(JSON.parse(this.responseText))
//     }

//     var req = new XMLHttpRequest()
//     req.addEventListener('load', reqListener)
//     req.open('POST', '/')
//     req.send()
// }