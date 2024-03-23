const myObeserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show')
    }else{
      entry.target.classList.remove('show')
    }
  })
})



const homeInformations = document.querySelectorAll('.hidden')

homeInformations.forEach((homeInformation) => myObeserver.observe(homeInformation))
