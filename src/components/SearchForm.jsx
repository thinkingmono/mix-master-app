import {Form, useNavigation} from 'react-router-dom';
import Wrapper from '../assets/wrappers/SearchForm';


const SearchForm = ({searchTerm}) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting'; /*UseNavigation hook brings state submitting when form submits. Used to change btn text and disable it when submitting*/
    return (<Wrapper>
        <Form className='form'>
            <input type="search" name="search" id="search" className="form-input" defaultValue={searchTerm}/>
            <button type="submit" className='btn' disabled={isSubmitting}>{isSubmitting ? 'searching...' : 'search'}</button>
        </Form>
    </Wrapper>
    )
}

export default SearchForm