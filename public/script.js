function toggleNavbar() {
    var navbarLinks = document.querySelector('.navbar-links');
    let navbar = document.querySelector('.navbar')


    if (navbarLinks.classList.contains('active')) {
        navbarLinks.classList.remove('active');
        navbar.classList.remove('active');

        navbarLinks.classList.remove('navbar-hidden-down')
        navbarLinks.classList.add('navbar-hidden-up')

        navbar.classList.remove('navbar-down')
        navbar.classList.add('navbar-up')

    } else {
        navbarLinks.classList.add('active');
        navbar.classList.add('active');

        navbarLinks.classList.remove('navbar-hidden-up')
        navbarLinks.classList.add('navbar-hidden-down')

        navbar.classList.remove('navbar-up')
        navbar.classList.add('navbar-down')

    }
}


let image_choose = (event) => {
    const previewImage = document.getElementById(`image-${event.target.id.split('-')[1]}`);
    console.log(event.target.id.split('-')[1])
    const file = event.target.files[0]; // Получаем выбранный файл
    const reader = new FileReader();

    reader.onload = function () {
        previewImage.src = reader.result; // Устанавливаем src выбранной картинки
    };

    if (file) {
        reader.readAsDataURL(file); // Читаем выбранный файл как URL данных
    } else {
        previewImage.src = ''; // Сбрасываем src, если файл не выбран
    }
}
let image_click = (event) => {
    let file = document.getElementById(`file-${event.target.id.split('-')[1]}`)
    file.click()
}

const image_zoom = (id) => {
    const image = document.getElementById(id)
    if (image.classList.contains('focus')) {
        image.classList.remove('focus')
    } else {
        image.classList.add('focus')
    }
}

const delete_alert=(event)=>{
    let form=event.target
    let action=form.action.split('/')
    let id=action[action.length-1]
    let check=confirm(`You are have delete element by id:${id}`)
    if (!check) {
        event.preventDefault();     
    } 
    
}