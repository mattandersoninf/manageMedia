import React, {Component} from 'react';
import axios from 'axios';

export default class Createmedia extends Component{
    // this is the constructor method that is the default state for responsibilities in the media list.
    // the description, responsible, and priority parameters are initally blank and the completed status is initially false
    constructor(props){
        super(props);

        this.state = {
            media_description: '',
            media_type: '',
            media_priority: '',
            media_completed: false
        }

        // these lines bind the functions below to this constructor so that these functions can be used to manipulate media items
        this.onChangemediaDescription = this.onChangemediaDescription.bind(this);
        this.onChangemediaResponsible = this.onChangemediaResponsible.bind(this);
        this.onChangemediaPriority = this.onChangemediaPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // these are the updating methods that will be used to alter the state of the responsibility on the media list
    onChangemediaDescription(e){
        this.setState({
            media_description: e.target.value
        });
    }
    onChangemediaResponsible(e){
        this.setState({
            media_responsible: e.target.value
        })
    }
    onChangemediaPriority(e){
        this.setState({
            media_priority: e.target.value
        })
    }
    // this is the method that will handle the submit event of the form which will be implemented to create a new media item
    onSubmit(e){
        // this line ensures that the default html behavior does not occur
        // we're just recording what's going on in the log because the server has not been set up yet
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`media Description: ${this.state.media_description}`);
        console.log(`media Responsible: ${this.state.media_responsible}`);
        console.log(`media Priority: ${this.state.media_priority}`);
        
        // Create the media item object that will be passed into the server
        const newmedia = {
            media_description : this.state.media_description,
            media_responsible : this.state.media_responsible,
            media_priority : this.state.media_priority,
            media_completed : this.state.media_completed
        }
        
        // Call the axios library to talk with the server
        axios.post('http://localhost:4000/medias/add', newmedia)
            .then(res => console.log(res.data));
        
        this.setState({
            media_description: '',
            media_responsible: '',
            media_priority: '',
            media_completed: false
        })
    }

    // this is the JSX code that will render the form for the media list
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New media</h3>
                <form onSubmit={this.onSubmit}>
                    {/* There is the option to use a fieldset but granted this form does not need to be separated into sets, there's no need to add fieldsets */}
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.media_description}
                                onChange={this.onChangemediaDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.media_responsible}
                                onChange={this.onChangemediaResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.media_priority==='Low'} 
                                    onChange={this.onChangemediaPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.media_priority==='Medium'} 
                                    onChange={this.onChangemediaPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.media_priority==='High'} 
                                    onChange={this.onChangemediaPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create media" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}