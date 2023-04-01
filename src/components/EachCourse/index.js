import './index.css'

const EachCourse = props => {
  const {details} = props
  const {imageUrl, name, description} = details

  return (
    <li className="listItem">
      <img className="each" alt={name} src={imageUrl} />
      <div>
        <p className="nme">{name}</p>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default EachCourse
