let users = [
    { id: 1, first_name: "Lauren", last_name: "Shaxby", email: "lshaxby0@php.net", created_at: "16/10/2021" },
    { id: 2, first_name: "Ardenia", last_name: "Paddingdon", email: "apaddingdon1@nsw.gov.au", created_at: "27/07/2021" },
    { id: 3, first_name: "Renaldo", last_name: "Alenichev", email: "ralenichev2@ftc.gov", created_at: "10/06/2021" },
    { id: 4, first_name: "Nichole", last_name: "OHeneghan", email: "noheneghan3@flavors.me", created_at: "28/06/2021" },
    { id: 5, first_name: "Haywood", last_name: "Daintry", email: "hdaintry4@nhs.uk", created_at: "18/03/2021" },
    { id: 6, first_name: "Leslie", last_name: "Daile", email: "ldaile5@vimeo.com", created_at: "23/05/2021" },
    { id: 7, first_name: "Byrann", last_name: "Slorance", email: "bslorance6@kickstarter.com", created_at: "15/05/2021" },
    { id: 8, first_name: "My", last_name: "Swendell", email: "mswendell7@moonfruit.com", created_at: "15/12/2021" },
    { id: 9, first_name: "Brier", last_name: "Esson", email: "besson8@usa.gov", created_at: "14/03/2021" },
    { id: 10, first_name: "Seth", last_name: "Piddle", email: "spiddle9@nationalgeographic.com", created_at: "20/10/2021" },
    { id: 11, first_name: "Fer", last_name: "Piddle", email: "ferspiddle9@nationalgeographic.com", created_at: "20/10/2022" },
]

const qtdUsers = 5 // quantidade de usuarios que aparece na tela

// calcula modulo de n%m
function mod(n, m) {
    return ((n % m) + m) % m;
}

function deleteUser(id, page) {
    users = users.filter(user => user.id !== id)
    document.getElementById(`${id}`).remove()
    setPagination(page)
}

/* pega os usuarios da tabela users e transforma em elementos tr */
function getUsersElements(page = 0) {
    const start = page * qtdUsers
    const end = start + qtdUsers

    return users.slice(start, end).map(user => {
        let row = document.createElement('tr')
        row.setAttribute('id', user.id)

        let userNameCell = document.createElement('td')
        userNameCell.appendChild(document.createTextNode(`${user.first_name} ${user.last_name}`))

        let userEmailCell = document.createElement('td')
        userEmailCell.appendChild(document.createTextNode(user.email))

        let userCreatedAtCell = document.createElement('td')
        userCreatedAtCell.appendChild(document.createTextNode(user.created_at))

        let actionsCell = document.createElement('td')
        actionsCell.classList.add('action_buttons')

        let editButton = document.createElement('button')
        editButton.classList.add('text_button', 'edit_button')
        editButton.appendChild(document.createTextNode('editar'))

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('text_button', 'delete_button')
        deleteButton.appendChild(document.createTextNode('excluir'))
        deleteButton.setAttribute('type', 'button')
        deleteButton.addEventListener('click', () => deleteUser(user.id, page))

        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)

        row.appendChild(userNameCell)
        row.appendChild(userEmailCell)
        row.appendChild(userCreatedAtCell)
        row.appendChild(actionsCell)

        return row
    })
}

const tbody = document.querySelector('tbody')

/* atualiza a tabela com os novos elementos de usuario */
function newPage(page = 0) {
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.lastChild)
    }

    getUsersElements(page).forEach(userElement => tbody.appendChild(userElement))
    setPagination(page)
}

function setPagination(currentPage = 0) {
    const pagination = document.querySelector('.pagination')
    while (pagination.hasChildNodes()) {
        pagination.removeChild(pagination.lastChild)
    }

    let qtdPages = Math.ceil(users.length / qtdUsers)

    let backBtnPagination = document.createElement('button')
    backBtnPagination.appendChild(document.createTextNode('<<'))
    backBtnPagination.setAttribute('type', 'button')
    backBtnPagination.addEventListener('click', () => newPage(mod(currentPage - 1, qtdPages)))
    pagination.appendChild(backBtnPagination)

    for (let page = 0; page < qtdPages; page++) {
        let paginationButton = document.createElement('button')
        paginationButton.appendChild(document.createTextNode(`${page+1}`))
        paginationButton.setAttribute('type', 'button')

        if (page === currentPage) paginationButton.classList.add('active')

        paginationButton.addEventListener('click', () => newPage(page))
        pagination.appendChild(paginationButton)
    }

    let nextBtnPagination = document.createElement('button')
    nextBtnPagination.appendChild(document.createTextNode('>>'))
    nextBtnPagination.setAttribute('type', 'button')
    nextBtnPagination.addEventListener('click', () => newPage(mod(currentPage + 1, qtdPages)))
    pagination.appendChild(nextBtnPagination)
}

getUsersElements(0).forEach(userElement => tbody.appendChild(userElement))
setPagination(0)