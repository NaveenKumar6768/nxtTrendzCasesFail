import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    onChangeSerchInput,
    clearFilters,
    enterSearchInput,
    changeCategory,
    searchInput,
    changeRating,
  } = props

  const onChangeSearch = event => {
    onChangeSerchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  return (
    <div className="filters-group-container">
      <div className="search-container">
        <input
          type="search"
          className="input"
          placeholder="Search"
          onChange={onChangeSearch}
          onKeyDown={onEnterSearchInput}
          value={searchInput}
        />
        <BsSearch />
      </div>
      <h1 className="category-heading">Category</h1>
      <ul className="category-container">
        {categoryOptions.map(eachCategory => {
          const {name, categoryId} = eachCategory
          const onClickCategory = () => changeCategory(categoryId)
          return (
            <li key={categoryId} className="category-item">
              <button
                onClick={onClickCategory}
                type="button"
                className="category-button"
              >
                <p className="category-text">{name}</p>
              </button>
            </li>
          )
        })}
      </ul>
      <h1 className="category-heading">Rating</h1>
      <ul className="category-container">
        {ratingsList.map(eachRating => {
          const {ratingId, imageUrl} = eachRating
          const onClickRating = () => changeRating(ratingId)
          return (
            <li key={ratingId} className="category-item">
              <button
                onClick={onClickRating}
                type="button"
                className="category-button"
              >
                <img
                  src={imageUrl}
                  alt={`rating ${ratingId}`}
                  className="rating-image"
                />
                <p className="rating-text">& up</p>
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={clearFilters} type="button" className="clear-button">
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
