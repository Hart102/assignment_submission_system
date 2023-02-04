const Overviewbox = ({text, overview}) => {
  return (
    <div className="box d-flex flex-column text-center justify-content-center py-5 px-2 pointer bg-white shadow-sm">
      <p>{text}</p>
      <b>{overview}</b>
    </div>
  )
}

export default Overviewbox