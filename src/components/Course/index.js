import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'
import CourseList from '../CourseList'
import NavBar from '../NavBar'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Course = () => {
  const [retryBtn, setRetryBtn] = useState(false)
  const [apiStatus, setApiStatus] = useState({
    status: apiStatusConstant.initial,
    data: null,
    error: null,
  })

  const onClickRetry = () => {
    setRetryBtn(prevState => !prevState)
  }

  useEffect(() => {
    const getApiSkills = async () => {
      setApiStatus({
        status: apiStatusConstant.inProgress,
        data: null,
        error: null,
      })

      const url = 'https://apis.ccbp.in/te/courses'
      const options = {
        method: 'GET',
      }
      const res = await fetch(url, options)
      if (res.ok === true) {
        const data = await res.json()
        console.log(data)
        const updatedData = data.courses.map(each => ({
          id: each.id,
          imageUrl: each.logo_url,
          name: each.name,
        }))
        setApiStatus(prevState => ({
          ...prevState,
          status: apiStatusConstant.success,
          data: updatedData,
        }))
      } else {
        setApiStatus(prevState => ({
          ...prevState,
          status: apiStatusConstant.failure,
          error: res.error_msg,
        }))
      }
    }
    getApiSkills()
  }, [retryBtn])

  const renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={60} width={80} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    const skills = data.map(each => (
      <CourseList skillsDetails={each} key={each.id} />
    ))
    return skills
  }

  const renderFailureView = () => (
    <div className="notContainer">
      <img
        className="notFound"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
      />
      <h1 className="oops">Oops! Something Went Wrong</h1>
      <p className="not">We cannot seem to find the page you are looking for</p>
      <navigate to="/">
        <button className="retry" onClick={onClickRetry} type="button">
          Retry
        </button>
      </navigate>
    </div>
  )

  const renderFinalOutput = () => {
    const {status} = apiStatus
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
      <div>
        <h1>Courses</h1>
        <ul>{renderFinalOutput()}</ul>
      </div>
    </div>
  )
}
export default Course
