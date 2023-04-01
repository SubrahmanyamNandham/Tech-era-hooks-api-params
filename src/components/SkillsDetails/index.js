import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import EachCourse from '../EachCourse'
import NavBar from '../NavBar'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SkillsDetails = () => {
  const [retryBtn, setRetryBtn] = useState(true)
  const [detailsApiStatus, setDetailsStatus] = useState({
    status: apiStatusConstant.initial,
    data: null,
    error: null,
  })

  const {id} = useParams()
  // console.log(id)

  const onClickRetry = () => {
    setRetryBtn(prevState => !prevState)
  }

  useEffect(() => {
    const getSkillApi = async () => {
      setDetailsStatus({
        status: apiStatusConstant.inProgress,
        data: null,
        error: null,
      })
      const url = `https://apis.ccbp.in/te/courses/${id}`
      const options = {
        method: 'GET',
      }
      const res = await fetch(url, options)
      const data = await res.json()

      const formattedData = eachItem => ({
        description: eachItem.description,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      })

      const updatedData = formattedData(data.course_details)

      if (res.ok) {
        setDetailsStatus(prevState => ({
          ...prevState,
          status: apiStatusConstant.success,
          data: updatedData,
        }))
      } else {
        setDetailsStatus(prevState => ({
          ...prevState,
          status: apiStatusConstant.failure,
          errorMsg: res.error_msg,
        }))
      }
    }

    getSkillApi()
  }, [retryBtn, id])

  const renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={60} width={80} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = detailsApiStatus

    const skillText = <EachCourse details={data} key={data.id} />
    return skillText
  }

  const renderFailureView = () => (
    <div className="notContainer">
      <img
        className="notFound"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <navigate to="/">
        <button className="retry" onClick={onClickRetry} type="button">
          Retry
        </button>
      </navigate>
    </div>
  )

  const renderRespectiveView = () => {
    const {status} = detailsApiStatus
    switch (status) {
      case apiStatusConstant.success:
        return renderSuccessView()
      case apiStatusConstant.inProgress:
        return renderLoadingView()
      case apiStatusConstant.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return (
    <div>
      <NavBar />
      <ul>{renderRespectiveView()}</ul>
    </div>
  )
}

export default SkillsDetails
