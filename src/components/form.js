import React, {Component} from 'react'

class Form extends Component {
    render () {
        return (
            <div className="form-container">
                <div className="form-label">
                    {this.props.label}
                </div>
                <textarea
                    cols="40"
                    rows="4"
                    spellCheck="false"
                    value={this.props.value}
                    onChange={this.props.handleChange} />
            </div>
        )
    }
}

export default Form
