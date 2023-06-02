fetch("https://api.pexels.com/v1/search?query=people",{
  headers: {
    Authorization: "GYh2Cm1DMrNRHwbKldbixrEAwxk5VGGHAmqXJDp06lnwQE8sOvQqjmSR"
  }
})
   .then(resp => {
     return resp.json()
   })
   .then(data => {
     console.log(data)
   })

let imagesToLoad = document.querySelectorAll("img[data-src]");
const loadImages = (image) =>
{
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () =>
    {
        image.removeAttribute("data-src");
    };
};

imagesToLoad.forEach((img) =>
{
    loadImages(img);
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) =>
    {
        items.forEach((item) =>
        {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
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