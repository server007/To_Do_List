function addTask() {
    const inpNewTask = document.getElementById('inpNewTask')
    const ulTaskList = document.getElementById('ulTaskList')
    const taskName = inpNewTask.value
    const newItem = document.createElement('li')
    newItem.setAttribute('onclick', 'toggl(this)')
    newItem.classList.add('list-group-item')
    newItem.textContent = taskName
    ulTaskList.appendChild(newItem)
}

function removeTask() {
    const list2 = document.querySelectorAll(".checked")
    for (var i = 0; li = list2[i]; i++) {
        li.parentNode.removeChild(li)
    }
}

function toggl(evid) {
    evid.classList.toggle('checked')
}























// function removeTask() {
//     let list2
//     const list = document.getElementsByClassName('list-group-item')
//     console.log(Object.entries(list), list)
//     let x = Object.values(list)
//     console.log(x)
//     list.forEach(element => {
//         if (element.classList.textContent('checked')) {
//             list2.appendChild(element)
//         }
//         console.log(list)
//         console.log(list2)
//     });
//     // .forEach((v, i, o) => {

//     // })
// }






// function togg() {
//     let list = document.querySelectorAll('ul');
//     list.addEventListener('click', function(event) {
//         if (event.target.tagName == 'li') {
//             event.target.classList.toggle('checked')
//         }
//     }, false)
// }








// console.log(evid)
// const ref = evid.toString(10)
// let obj = document.getElementById(ref)
// console.log(ref, evid, obj)
//evid.addEventListener('click', function(e) {
//    console.log("inside")
// if (e.target.id === 'evid') {
//     console.log("clicked")
//    console.log(x++)
//    e.target.classList.toggle('checked')
//}
//}, false)
//}