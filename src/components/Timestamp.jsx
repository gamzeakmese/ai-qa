import moment from 'moment';

const Timestamp=({date})=>{
  const formattedTime = moment(date).format('h:mm A'); // Saati biçimlendirin (örn: 10:30 AM)
  const formattedDate = moment(date).format('MMMM Do YYYY'); // Tarihi biçimlendirin (örn: October 26th 2023)

  return(
    <div className="text-xs text-gray-500 text-right"> {/* Stilleri burada ayarlayabilirsiniz */}
    {formattedTime} - {formattedDate}
  </div>
  );
}
export default Timestamp;