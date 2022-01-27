import './Alert.css';

export default function Alert({ item }) {
  const { event, start, end, senderName, tags, description } = item;
  const startTime = new Date(start);
  const endTime = new Date(end);
  return (
    <div className="alert-container">
      <p className="alert-category">{event.toUpperCase()}</p>
      <span>
        {' '}
        <strong>by:</strong> {senderName}
      </span>
      <p className="alert-date">
        <strong>Start Time:</strong> {startTime.getUTCHours()} :{' '}
        {startTime.getUTCMinutes()}
        <span className="alert-date">
          <strong> End Time:</strong> {endTime.getUTCHours()} :{' '}
          {endTime.getUTCMinutes()}
        </span>
      </p>
      <h2 className="alert-title">{tags}</h2>
      <h4 className="alert-description">{description}</h4>
    </div>
  );
}
