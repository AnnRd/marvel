class MarvelService {
    getRecource = async (url) => {
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Can not fetch ${url}, status : ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getRecource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=f65f5a21349dce7531dd6bd0db9e3868')
    }
}

export default MarvelService;