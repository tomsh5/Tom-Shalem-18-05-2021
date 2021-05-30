export default {
    getGeoLocaion
};

async function getGeoLocaion(){
    try {
        const pos= await _getPos()
        return pos
    } catch (err){
        console.log('Cannot access geo locaiton, please check the browser permisions', err)
    }
}

async function _getPos() {
    if('geolocation' in navigator) {
        let pos = await new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej,{timeout:2000});
        });
        return {lat:pos.coords.latitude,long:pos.coords.longitude};
    }
}
