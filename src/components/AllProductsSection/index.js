import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    titleSearch: '',
    category: '',
    rating: '',
    isSuccess: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {rating, titleSearch, category} = this.state

    // TODO: Update the code to get products with filters applied

    const {activeOptionId} = this.state
    /*
      let apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`

    if (titleSearch !== '') {
      apiUrl += `&title_search=${titleSearch}`
    }
    if (rating !== '') {
      apiUrl += `&rating=${rating}`
    }
    if (category !== '') {
      apiUrl += `&category=${category}`
    }
    */
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&rating=${rating}&title_search=${titleSearch}&category=${category}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        isSuccess: true,
      })
    } else {
      this.setState({isSuccess: false, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  onChangeSerchInput = searchText => {
    //  console.log(searchText)
    this.setState({searchInput: searchText})
  }

  changeRating = id =>
    this.setState({rating: id, titleSearch: ''}, this.getProducts)

  changeCategory = id =>
    this.setState({category: id, titleSearch: ''}, this.getProducts)

  clearFilters = () =>
    this.setState({category: '', rating: '', titleSearch: ''}, this.getProducts)

  submitInput = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.setState(
        {searchInput: '', titleSearch: searchInput},
        this.getProducts,
      )
    }

    console.log('submit triggered')
  }

  renderProductsList = () => {
    const {
      productsList,
      activeOptionId,
      titleSearch,
      category,
      rating,
    } = this.state
    console.log(titleSearch, category, rating)

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="failure-image"
          />
          <h1 className="failure-heading">No Products Found</h1>
          <p className="failure-text">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We are having some trouble procesing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {isLoading, searchInput, isSuccess} = this.state

    const currentView = isSuccess
      ? this.renderProductsList()
      : this.renderFailureView()

    console.log(isSuccess)

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onChangeSerchInput={this.onChangeSerchInput}
          submitInput={this.submitInput}
          searchInput={searchInput}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />

        {isLoading ? this.renderLoader() : currentView}
      </div>
    )
  }
}

export default AllProductsSection
