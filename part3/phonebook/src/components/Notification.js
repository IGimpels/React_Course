const Notification = ({notification}) => {
    if(!notification)
      return <></>
  
    const color = notification.isError ? 'red' : 'green'
    const notificationStyle = {
      width: '100%',
      color: color,
      border: `3px solid ${color}`,
      borderRadius: '5px',
      backgroundColor: 'lightgray',
      padding: '15px',
      fontSize: '22px',
  
    }
    return <div style={notificationStyle}>{notification.message}</div>
  }

  export default Notification