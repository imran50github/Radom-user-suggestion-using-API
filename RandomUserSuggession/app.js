document.addEventListener('DOMContentLoaded', () => {
  let result = document.getElementById('result');
  let filterUser = document.getElementById('filter-user');
  const listItems = []
  getdata()

  // to filter users
  filterUser.addEventListener('keyup', filterData)

  // to remove user
  result.addEventListener('click', removeUser);
  result.addEventListener('click', addUser);

  // fetch data from API
  async function getdata() {
    const res = await fetch("https://randomuser.me/api?results=200")
    const { results } = await res.json()
    // const userDetail = (results[0].name.first)
    results.innerHTML = ''
    results.forEach(user => {
      // console.log(user)
      const li = document.createElement('li')
      listItems.push(li)
      li.innerHTML = `
      <span class="remove-btn">X</span>
      <img src="${user.picture.large}" alt="picture" class="image"/>
      <div class="user-name"><a href="#">${user.name.first} ${user.name.last}</a></div>
      <button class="add-btn">Add+</button>
      `
      result.appendChild(li)
    });
  }


  //  to filter user
  function filterData() {
    let input, filter, ul, li, a, i, textValue;
    input = document.getElementById('filter-user');
    filter = input.value.toUpperCase();
    // console.log(filter)
    ul = document.getElementsByTagName('ul');
    // console.log(ul)
    li = document.getElementsByTagName('li');
    // console.log(li)
    for (i = 0; i < li.length; i++) {
      // console.log(i)
      a = li[i].getElementsByTagName('a')[0]
      // console.log(a)
      textValue = a.textContent || a.innerText;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = "none";
      }
    }
  }

  // to delete user
  function removeUser(e) {
    const msgRemoved = document.getElementById('msg-removed');
    // const text = document.createTextNode('User Removed!')
    // msg.appendChild(text)
    // work only if its clicked on delete btn
    if (e.target.classList.contains('remove-btn')) {
      // confirm before delete
      if (confirm('Are You Sure?')) {
        const removeLi = e.target.parentElement;
        result.removeChild(removeLi);
        msgRemoved.style.display = 'block'
        msgRemoved.style.color = '#b30000'
        setTimeout(() => {
          msgRemoved.style.display = 'none'
        }, 3000)
      }
    }
  }

  // to add user
  function addUser(e) {
    const msgAdd = document.getElementById('msg-added');
    // const text = document.createTextNode('User Added!')
    // msg.appendChild(text)
    // work only if its clicked on delete btn
    if (e.target.classList.contains('add-btn')) {
      // console.log('added')
      msgAdd.style.display = 'block'
      msgAdd.style.color = 'green'
      setTimeout(() => {
        msgAdd.style.display = 'none'
      }, 3000)
    }
  }
});
