import React, { Component } from 'react'
import AddTopic from './add'
import ListTopic from './list'
import './style.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
        
      const getItemStyle = (isDragging, draggableStyle) => ({  
        background: isDragging ? 'steelblue' : '#f2f2f2',
          ...draggableStyle,
      });

export default class Topic extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            addClicked: false,
            index: null,
            dragData: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    };

    componentWillReceiveProps(nextProps){
        this.setState({dragData: nextProps.topics})
       
    }

    onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const sections = reorder(
          this.state.dragData,
          result.source.index,
          result.destination.index
        );

        this.setState({dragData: sections})

      }

    addClicked = () => {
        this.setState({addClicked: !this.state.addClicked})
    }

    clicked = (x) => {
        this.setState({index: x})
    }

    addNewTopic= () => {
        console.log('Just added a Topic ');
        this.setState({addClicked: !this.state.addClicked})
    }

    deleteTopic = (topic) => {
        //console.log('Just Deleted a Topic ');
        var toDelete = window.confirm('Are you sure you want to delete');
        if(toDelete){
            let section = this.state.dragData[this.state.index]
            this.props.delete(topic)
            this.setState({index: null})
        } 
    }

    handleSubmit(event){
        alert('A name was submitted: '+this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div className='container'>
                <h3>Topics</h3>
                <div className='wrapper'>
            <AddTopic toggle={this.addNewTopic} delete={this.deleteTopic}/>
            <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId='root' >
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {this.state.dragData.map((item, idx)=>(
                            <Draggable key={idx} draggableId={idx} index={idx}>
                            {(provided, snapshot) => (
                                <div>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                    >
                                    <div className='listSubj'>
                                    {console.log("Topics: "+JSON.stringify(item))}
                                        <span>{idx+1}. </span><ListTopic topic={item.topic} edit={this.edit} click={this.clicked} index={idx} />
                                    </div>
                                </div>
                                {provided.placeholder}
                                </div>
                            )}
                            </Draggable>
                            )
                            )}
                            
                          
                            {provided.placeholder}
                        </div>}
        </Droppable>
        
      </DragDropContext>
        {this.state.addClicked&&(
            <div>
                <input className='inputFld' ref={name=>this.inputName = name} type='text' placeholder='Subject name' />
                <input type='text' ref={code=>this.inputCode=code} placeholder='enter code' />
                <button onClick={this.addSection}>save</button>
            </div>
        )}

            {/*<form onSubmit={this.handleSubmit}>
                <label>Name: 
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="enter" />
            </form>*/}
            
            </div>
            </div>
            );
    }
}
