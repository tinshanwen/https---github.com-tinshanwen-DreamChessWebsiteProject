window.addEventListener('scroll', function() {
    //If the page is not at the top, function will work
    if (window.pageYOffset !== 0) {
        document.querySelector('nav').classList.add('black');
    } else {
        document.querySelector('nav').classList.remove('black');
    }
});

document.querySelectorAll('nav ul li').forEach(function(li) {
    li.addEventListener('mouseover', function() {
        const dropdown = li.querySelector('.dropdown-content');
        if (dropdown) {
            dropdown.style.display = 'block';
        }
    });

    li.addEventListener('mouseout', function() {
        const dropdown = li.querySelector('.dropdown-content');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    });
});
