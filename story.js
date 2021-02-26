const axios = require('axios');
const Jimp = require('jimp');

axios.get('https://fortniteapi.io/v2/shop?lang=es', {
    headers: { 'Authorization': '72476994-70419ad2-98e3120f-a4d07dd4' }
}).then(result => {
    let shopItems = result.data.shop;
    shopItems.forEach(function(item) {
        const grantedItems = item.granted;
        const outfitsItems = grantedItems.filter(outfit => (outfit.type.id == "outfit"));
        outfitsItems.forEach(function(granted) {
            if (granted.images.featured === null) {
                var cosmeticIcon = granted.images.icon
            } else {
                var cosmeticIcon = granted.images.featured
            }
            console.log(granted.name + ` (${granted.type.name})`);
            Jimp.read('background.png')
                .then(image => {

                    Jimp.read(cosmeticIcon)
                        .then(icon => {
                            icon.resize(1080, 1080)
                            image.composite(icon, 0, 270)
                            console.log(`Icon ${granted.name}...`)
                            Jimp.read('blanco.png')
                                .then(rectangle => {
                                    image.composite(rectangle, 0, 0)
                                    image.write(`${granted.name}.png`)
                                    console.log(`Guardando ${granted.name}...`)
                                })
                        })
                })
        })
    })
})
