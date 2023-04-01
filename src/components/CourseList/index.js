import {Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {skillsDetails} = props
  const {id, imageUrl, name} = skillsDetails
  return (
    <Link to={`/courses/${id}`}>
      <li className="list">
        <div className="skillItem">
          <img alt="skills" src={imageUrl} className="imageList" />
          <p className="name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default CourseList
