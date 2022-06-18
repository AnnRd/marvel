import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Sceleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (character) => {
        this.setState({
            character, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {character, loading, error} = this.state;

        const skeleton = character || loading || error ? null : <Sceleton/>; // "заглушка" пока не выбран никакой персонаж из charList
        const content = !loading && !error && character ? <View character={character}/> : null;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error? <ErrorMessage/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {content}
                {spinner}
                {errorMessage}
            </div>
        )
    }
    
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = character;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map( (item, i) => {
                        if (i > 10) {
                            return;
                        }

                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;