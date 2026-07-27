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

    // A nested fader already rides its parent's scale; scaling it again
    // compounds the transform and pushes content past the viewport.
    let nested = elem.parentElement && elem.parentElement.closest(".fade-me-in");

    elem.style.opacity = 0;
    if (!nested)
        elem.style.transform = 'scale(1.1)';

    setTimeout(()=>{
        elem.style.transition = `all 0.5s ease-out ${delay}s`;
        elem.style.opacity = 1;
        if (!nested)
            elem.style.transform = 'scale(1)';
        elem.classList.remove("fade-me-in");
    }, 500);
});

function updateTime()
{
    let time = document.querySelector("#loc-time");
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

const DAY_START_HOUR = 7;
const DAY_END_HOUR   = 20;

function updateDayNight()
{
    const el = document.querySelector("#daynight");
    if (!el) return;

    const hourStr = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        hour12: false,
        timeZone: 'America/New_York'
    }).format(new Date());
    const hour = parseInt(hourStr, 10) % 24;

    const isNight = hour < DAY_START_HOUR || hour >= DAY_END_HOUR;
    el.classList.toggle("is-night", isNight);
}

updateTime();
updateDayNight();

setInterval(() => {
    updateTime();
    updateDayNight();
}, 1000);

function wrapFigureImages()
{
    const imgs = document.querySelectorAll("figure img");
    imgs.forEach((img) => {
        if (img.closest("a")) return;

        const link = document.createElement("a");
        link.href = img.getAttribute("src");
        link.target = "_blank";
        link.rel = "noopener";
        link.className = "figure-img-link";

        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
    });
}

function initSkillLabels()
{
    const icons = document.querySelectorAll("svg.skill");
    icons.forEach((icon) => {
        if (icon.parentElement && icon.parentElement.classList.contains("skill-wrap"))
            return;

        const title = icon.querySelector("title");
        const name = icon.getAttribute("aria-label") || (title && title.textContent) || "";

        const wrap = document.createElement("span");
        wrap.className = "skill-wrap";
        wrap.setAttribute("data-name", name);

        title.style.color = "red";

        icon.parentNode.insertBefore(wrap, icon);
        wrap.appendChild(icon);
    });
}

function onReady()
{
    wrapFigureImages();
    initSkillLabels();
}

if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", onReady);
else
    onReady();