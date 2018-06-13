export class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup-inner'>
            <h3>{ this.props.popupTitle }</h3>
            <h5>{ this.props.popupText }</h5>
            <div className='popup-btn-container'>
                <button onClick={this.props.saveAndClose} className = "btn btn-primary">Apply</button>
                <button onClick={this.props.closePopup} className = "btn btn-default" >Cancel</button>
            </div>
          </div>
        </div>
      );
    }
  }


  Popup.propTypes = {
    popupTitle: PropTypes.string.isRequired,
    popupText: PropTypes.string.isRequired,
    saveAndClose: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired
};