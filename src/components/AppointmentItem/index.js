import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {itemDetails, onToggle} = props
  const {id, name, date, isFavourite} = itemDetails

  const finalDate = date.split('-')

  const onToggling = () => {
    onToggle(id)
  }

  const activeClass = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listItem">
      <div className="listHead">
        <p className="nameP">{name}</p>
        <button className="starBton" type="button" data-testid="star">
          <img
            src={activeClass}
            className="starImg"
            alt="star"
            onClick={onToggling}
          />
        </button>
      </div>
      <p className="dateP">
        Date:{' '}
        {format(
          new Date(finalDate[0], finalDate[1] - 1, finalDate[2]),
          'dd MMMM yyyy, EEEE',
        )}
      </p>
    </li>
  )
}

export default AppointmentItem
