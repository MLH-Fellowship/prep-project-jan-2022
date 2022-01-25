import './Alert.css';

export default function Alert() {
  return (
    <div className="alert-container">
      <p className="alert-category">SEVERE WEATHER WARNING</p>
      <p className="alert-date">Jan 22 | BUREAU OF METEOROLOGY</p>
      <h2 className="alert-title">Minor Flood Warning for the Lachlan River</h2>
      <p className="alert-description">
        MINOR FLOODING CONTINUES AT BOOLIGAL Releases from Brewster Weir have
        caused minor flooding along the Lachlan River at Booligal. The Lachlan
        River at Hillston fell below the minor flood level on Saturday morning,
        22 January. Lower Lachlan River downstream of Euabalong to Booligal
        Weir: Minor flooding is occurring at Booligal...
      </p>
    </div>
  );
}
