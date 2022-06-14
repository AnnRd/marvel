class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f65f5a21349dce7531dd6bd0db9e3868';

    getRecource = async (url) => {
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Can not fetch ${url}, status : ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getRecource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = (id) => {
        return this.getRecource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService;