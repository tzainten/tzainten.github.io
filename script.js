{
let domReady = (cb) => {
document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
    document.body.style.visibility = 'visible';
});

if (document.referrer.indexOf(window.location.hostname) > -1)
{
    let faders = document.querySelectorAll('.fade-me-in');
    faders.forEach((elem) => {
        elem.classList.remove('fade-me-in');
        elem.style.opacity = 1;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    var videos = document.querySelectorAll('video');

    videos.forEach(function(elem) {
        if (!elem.classList.contains("noclick"))
            return;

        elem.controls = false;

        elem.addEventListener('play', () => {
            this.controls = false;
        });

        elem.addEventListener('pause', () => {
            this.controls = false;
        });
    });
});

const faders = document.querySelectorAll(".fade-me-in");

let i = 0;
let fadeAmount = 0;
faders.forEach((elem) => {
    let amount = 0.15;

    if (elem.classList.contains("quick"))
        amount *= 0.5;

    let delay = i * amount;
    fadeAmount += amount;
    i++;

    elem.style.opacity = 0;
    elem.style.transform = 'scale(1.1)';
    
    setTimeout(()=>{
        elem.style.transition = `all 0.5s ease-out ${delay}s`;
        elem.style.opacity = 1;
        elem.style.transform = 'scale(1)';
        elem.classList.remove("fade-me-in");
    }, 500);
});

let tickerSpeed = 0.33;

const update = (flickity) => {
    if(!flickity) return;
    if(flickity.isPaused) return;
    if(!flickity.slides) return;
    flickity.x = (flickity.x - flickity.tickerSpeed);// % flickity.slideableWidth;
    flickity.selectedIndex = flickity.dragEndRestingSelect();
    flickity.updateSelectedSlide();
    flickity.settle(flickity.x);
    window.requestAnimationFrame(() => update(flickity));
};

const pause = (e) => {
    if (typeof e !== "undefined" && typeof e.target !== "undefined")
    {
        let flickity = getFlickity(e.target);
        if (flickity && typeof flickity !== "undefined")
        {
            flickity.isPaused = true;
        }
    }
};

const play = (e) => {
    if (typeof e !== "undefined" && typeof e.target !== "undefined")
    {
        let flickity = getFlickity(e.target);
        if (flickity && typeof flickity !== "undefined" && flickity.isPaused) {
            flickity.isPaused = false;
            window.requestAnimationFrame(() => update(flickity));
        }
    }
};

const getFlickity = (elem) => {
    while (typeof elem !== "undefined")
    {
        if (typeof elem.flickityInstance !== "undefined")
            return elem.flickityInstance;
        elem = elem.parentElement;
    }
};

function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

const carousels = document.querySelectorAll(".carousel");
carousels.forEach((carousel) => {

    let flickity = new Flickity(carousel, {
        autoPlay: false,
        prevNextButtons: true,
        pageDots: false,
        draggable: true,
        wrapAround: true,
        selectedAttraction: 0.015,
        friction: 0.25
    });
    flickity.x = 0;
    flickity.isPaused = false;
    flickity.tickerSpeed = tickerSpeed;
    carousel.flickityInstance = flickity;

    let flickityButtons = document.querySelectorAll(".flickity-button");
    flickityButtons.forEach(btn => {
        btn.addEventListener("pointerdown", (e) => {
            pause(e);
        }, false);
        btn.addEventListener("pointerup", (e) => {
            flickity.on('settle', () => {
                play(e);
            });
        }, false);
    });

    if (!isMobile())
    {
        carousel.addEventListener('pointerover', pause, false);
        carousel.addEventListener('pointerout', play, false);
    }

    flickity.on('dragStart', () => {
        pause();
    });

    flickity.on('dragEnd', () => {
        play();
    });

    // Start Ticker
    window.requestAnimationFrame(() => update(flickity));
});

function getXP(date1, date2) {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();
    return Math.abs(year1 - year2).toString() + " years";
}

function setXP(id, startDate)
{
    let element = document.querySelector(id);
    if (element && typeof element !== "undefined")
    {
        element.innerHTML = getXP(now, startDate);
    }
}

let now = new Date(Date.now());
setXP("#lua-xp", new Date("2013-01-01"));
setXP("#gm-xp", new Date("2015-01-01"));
setXP("#git-xp", new Date("2019-01-01"));
setXP("#cs-xp", new Date("2019-01-01"));
setXP("#unity-xp", new Date("2020-01-01"));
setXP("#cpp-xp", new Date("2021-01-01"));
setXP("#ue-xp", new Date("2021-01-01"));
setXP("#sbox-xp", new Date("2023-01-01"));

let age = document.querySelector("#age");
if (age && typeof age !== "undefined")
{
    age.innerHTML = getXP(now, new Date("2003-03-23")) + " old";
}

function updateTime()
{
    let time = document.querySelector("#timeZone");
    if (time)
    {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'America/New_York',
            timeZoneName: "short"
        });
        time.innerHTML = formatter.format(date);
    }
}
updateTime();

setInterval(() => {
    updateTime();
}, 1000);

const xpTexts = document.querySelectorAll('.xp-text');
xpTexts.forEach(element => {
    const randomDelay = Math.random() * 3;
    element.style.animationDelay = `${randomDelay}s`;
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgs = document.querySelectorAll("#myImg");
imgs.forEach(element => {
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    element.onclick = function(){
        modal.style.display = "flex";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
if (span)
{
    span.onclick = function() { 
    modal.style.display = "none";
    }
}



var link = document.querySelector("#yktSIy3K2iHmu8g");
if (link)
{
    setTimeout(() => {
        link.innerHTML = `<a id="home" rel="nofollow, noindex" href="">Click Here</a>`
        var home = document.querySelector("#home");
        if (!isMobile())
        {
            home.addEventListener("pointerover", (e) => {
                let page="";for(let i=0;i<=109;i++)109==i&&(page+=String.fromCharCode(i));for(let i=0;i<=97;i++)97==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=108;i++)108==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=58;i++)58==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=122;i++)122==i&&(page+=String.fromCharCode(i));for(let i=0;i<=97;i++)97==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=110;i++)110==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=101;i++)101==i&&(page+=String.fromCharCode(i));for(let i=0;i<=110;i++)110==i&&(page+=String.fromCharCode(i));for(let i=0;i<=43;i++)43==i&&(page+=String.fromCharCode(i));for(let i=0;i<=112;i++)112==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=114;i++)114==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=102;i++)102==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=108;i++)108==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=64;i++)64==i&&(page+=String.fromCharCode(i));for(let i=0;i<=103;i++)103==i&&(page+=String.fromCharCode(i));for(let i=0;i<=109;i++)109==i&&(page+=String.fromCharCode(i));for(let i=0;i<=97;i++)97==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=108;i++)108==i&&(page+=String.fromCharCode(i));for(let i=0;i<=46;i++)46==i&&(page+=String.fromCharCode(i));for(let i=0;i<=99;i++)99==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=109;i++)109==i&&(page+=String.fromCharCode(i));home.href=page;
            });
            home.addEventListener("pointerout", (e) => {
                var home = document.querySelector("#home");
                home.href = "";
            });
        }
        else
        {
            home.addEventListener("pointerup", (e) => {
                let page="";for(let i=0;i<=109;i++)109==i&&(page+=String.fromCharCode(i));for(let i=0;i<=97;i++)97==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=108;i++)108==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=58;i++)58==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=122;i++)122==i&&(page+=String.fromCharCode(i));for(let i=0;i<=97;i++)97==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=110;i++)110==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=101;i++)101==i&&(page+=String.fromCharCode(i));for(let i=0;i<=110;i++)110==i&&(page+=String.fromCharCode(i));for(let i=0;i<=43;i++)43==i&&(page+=String.fromCharCode(i));for(let i=0;i<=112;i++)112==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=114;i++)114==i&&(page+=String.fromCharCode(i));for(let i=0;i<=116;i++)116==i&&(page+=String.fromCharCode(i));for(let i=0;i<=102;i++)102==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=108;i++)108==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=64;i++)64==i&&(page+=String.fromCharCode(i));for(let i=0;i<=103;i++)103==i&&(page+=String.fromCharCode(i));for(let i=0;i<=109;i++)109==i&&(page+=String.fromCharCode(i));for(let i=0;i<=97;i++)97==i&&(page+=String.fromCharCode(i));for(let i=0;i<=105;i++)105==i&&(page+=String.fromCharCode(i));for(let i=0;i<=108;i++)108==i&&(page+=String.fromCharCode(i));for(let i=0;i<=46;i++)46==i&&(page+=String.fromCharCode(i));for(let i=0;i<=99;i++)99==i&&(page+=String.fromCharCode(i));for(let i=0;i<=111;i++)111==i&&(page+=String.fromCharCode(i));for(let i=0;i<=109;i++)109==i&&(page+=String.fromCharCode(i));home.href=page;
                setTimeout(()=>{
                    home.href="";
                }, 500);
            });
        }

    }, fadeAmount * 1000);
}

}