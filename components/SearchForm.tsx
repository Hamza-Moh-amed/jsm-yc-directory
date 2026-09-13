import Form from 'next/form'
import SearchFormRest from './SearchFormRest'
import { SearchIcon } from 'lucide-react'

const SearchForm = ({query}: {query?: string}) => {

  return (
    <Form
    action="/"
    scroll={false}
    className='search-form'
    >
        <input
        className='search-input'
        placeholder='Search Startups'
        name='query'
        defaultValue=""
        />
        <div className='flex gap-2'>
            {query && (
                <SearchFormRest />
            )}
            <button
            type='submit'
            className='search-btn text-white'
            >
                <SearchIcon className='size-5' />
            </button>
        </div>
    </Form>
  )
}

export default SearchForm