import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component{
    state = {
        charList: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    onCharLoaded = (charList) => {
        this.setState({
            charList, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    renderCharacters(arr) {
        const characters = arr.map(obj => {
            let imgStyle = {'objectFit' : 'cover'};
            if (obj.thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit' : 'unset'};
            }
            console.log(imgStyle);

            // const notAvailableImg = obj.thumbnail.includes('image_not_available');

            //  в стиле у li - style={{objectFit: notAvailableImg ? 'unset' : 'cover'}}
            // console.log(notAvailableImg);

            return (
                <li className="char__item char__item_selected" key={obj.id} style={imgStyle}>
                    <img src={obj.thumbnail} alt={obj.name}/>
                    <div className="char__name">{obj.name}</div>
                </li>
            ) //  УБРАТЬ АКТИВНЫЙ СТИЛЬ - безз него класс char__item
            
        });

        return (
            <ul className="char__grid">
                {characters}
            </ul>
        ) //Для центровки спиннера/ошибки
    }
    

    render() {
        const {charList, loading, error} = this.state;
        
        const items = this.renderCharacters(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? items : null;

        return (
            <div className="char__list">
                    {content}
                    {spinner}
                    {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;