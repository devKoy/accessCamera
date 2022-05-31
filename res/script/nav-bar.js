var menu_bar = document.querySelector('.sc-bottom-bar');
var menu_item = document.querySelectorAll('.sc-menu-item');
var menu_indicator = document.querySelector('.sc-nav-indicator');
var menu_current_item = document.querySelector('.sc-current');
var menu_position;
var nav_title = document.getElementsByClassName('nav-title');

var home = document.getElementById('home');
var community = document.getElementById('community');
var scanner = document.getElementById('scanner-container');
var almanac = document.getElementById('almanac');
var profile  = document.getElementById('profile');
var map = document.getElementById('maps');

menu_position = menu_current_item.offsetLeft - 55;
menu_indicator.style.left = menu_position + "px";
menu_bar.style.backgroundPosition = menu_position-10 + 'px';
menu_item.forEach(
  function(select_menu_item){
    select_menu_item.addEventListener('click', function(e){
      e.preventDefault();
      menu_position = this.offsetLeft - 55;
      menu_indicator.style.left = menu_position + "px";
      menu_bar.style.backgroundPosition = menu_position-10 + 'px';
      [...select_menu_item.parentElement.children].forEach(
        sibling => {
          sibling.classList.remove('sc-current');
        })
      select_menu_item.classList.add('sc-current');
      change_scan_color();
      for(i=0; i < nav_title.length; i++){nav_title[i].style.display = 'block'; nav_title[i].classList.remove('hidden')}
      this.children[1].style.display = "none";
      var current = this.children[1].innerText;
      changeActivity(current)
    });
  }
)

function change_scan_color(){
    var scan = document.getElementById('scanner');
    var item = document.getElementById('nav-scan');
    if(item.classList.contains("sc-current")){
        scan.classList.add("scan-selected")  
    }else{
        scan.classList.remove("scan-selected")  
    }
}

function changeActivity(current) {
  menu_indicator.classList.remove("cam-indicator");
  
    var home = document.getElementById('home');
    var community = document.getElementById('community');
    var scanner = document.getElementById('scanner-container');
    var almanac = document.getElementById('almanac');
    var profile  = document.getElementById('profile');
    var map = document.getElementById('maps');

    if(current == "home" || current == "Home"){
        home.style.display = "flex";
        scanner.style.display = "none";
        community.style.display = "none";
        almanac.style.display = "none";
        profile.style.display = "none";
        map.style.display = "none";
    }else if(current == "scan" || current == "Scan"){
        home.style.display = "none";
        scanner.style.display = "flex";
        menu_indicator.classList.add("cam-indicator");
        community.style.display = "none";
        almanac.style.display = "none";
        map.style.display = "none";
        profile.style.display = "none";
    }else if(current == "community" || current == "Community"){
        home.style.display = "none";
        scanner.style.display = "none";
        community.style.display = "flex";
        almanac.style.display = "none";
        map.style.display = "none";
        profile.style.display = "none";
    }else if(current == "almanac" || current == "Almanac"){
        home.style.display = "none";
        scanner.style.display = "none";
        community.style.display = "none";
        almanac.style.display = "flex";
        profile.style.display = "none";
        map.style.display = "none";
    }else if(current == "me" || current == "Me"){
        home.style.display = "none";
        scanner.style.display = "none";
        community.style.display = "none";
        almanac.style.display = "none";
        profile.style.display = "flex";
        map.style.display = "none";
    }else if(current == "Map"){
        home.style.display = "none";
        scanner.style.display = "none";
        community.style.display = "none";
        almanac.style.display = "none";
        profile.style.display = "none";
        map.style.display = "flex";
    }
}