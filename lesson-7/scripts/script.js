let imagesToLoad = document.querySelectorAll("img[data-src]");

async function getImages()
{
    let url = "https://api.pexels.com/v1/search?query=universe"

    let res = await fetch(url,{
            headers:{
                Authorization: "GYh2Cm1DMrNRHwbKldbixrEAwxk5VGGHAmqXJDp06lnwQE8sOvQqjmSR"
            }});
    let data = await res.json();
    let images = [];
    let i = 0
    for(i=0; i < 6 ;i++)
    {
        images.push(data['photos'][i]['src']['medium'])
    }
    i = 0
    imagesToLoad.forEach((img) =>
    {
        img.setAttribute("data-src", images[i]);
        i++;
    });
}

getImages()

setTimeout(function(){
    const loadImages = (image) =>
    {
        if (image.getAttribute('data-src') != 'images/placeholder.jpg')
        {
            image.setAttribute("src", image.getAttribute("data-src"));
            image.onload = () =>
            {
                image.removeAttribute("data-src");
            };
        }
    };
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((items, observer) =>
        {
            items.forEach((item) =>
            {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    if (item.target.getAttribute('data-src') != 'images/placeholder.jpg')
                    {
                        observer.unobserve(item.target);
                    }
                }
            });
        });
        imagesToLoad.forEach((img) =>
        {
            observer.observe(img);
        });
    }
    else
    {
        imagesToLoad.forEach((img) =>
        {
            loadImages(img);
        });
    }
}, 150);