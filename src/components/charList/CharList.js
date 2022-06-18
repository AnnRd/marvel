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
        this.onRequest();
    }

    onRequest = (offset) => {
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
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

    renderCharacters(arr) {
        const characters = arr.map(obj => {
            let imgStyle = {'objectFit' : 'cover'};
            if (obj.thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li
                className="char__item char__item_selected"
                key={obj.id}
                onClick={() => this.props.onCharSelected(obj.id)}>
                    <img src={obj.thumbnail} alt={obj.name}  style={imgStyle}/>
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