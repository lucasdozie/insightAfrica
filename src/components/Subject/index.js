import React, { Component } from 'react'
import AddSubject from './add'
import ListSubject from './list'
import './style.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
    
  const getItemStyle = (isDragging, draggableStyle) => ({  
    background: isDragging ? 'steelblue' : 'grey',
      ...draggableStyle,
  });


export default class Subject extends Component {

    state = {
        addClicked: false,
        index: null
    }

    onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const subjects = reorder(
          this.props.subjects,
          result.source.index,
          result.destination.index
        );

        this.props.dropUpdate(subjects)

      }

    addClicked = () => {
        this.setState({addClicked: !this.state.addClicked})
    }

    clicked = (i) => {
        this.setState({index: i})
        this.props.click(i)
    }

    submit = (e) => {
        if (e.key === 'Enter') {
            let val = e.target.value
            this.props.submit(val)
            this.setState({addClicked: false})
            e.target.value = ''
          }
    }

    edit = (subj, i) => {
        let subjects = this.props.subjects.map((item)=>item)
        subjects[i].title = subj
        this.props.edit(subjects)
    }

    delete = () => {
        var toDelete = window.confirm('Are you sure you want to delete');
        if(toDelete){
            let subjects = this.props.subjects.filter((item, i)=>i !== this.state.index)
            this.props.delete(subjects)
            this.setState({index: null})
        }
    
    }



    render(){
    return (
        <div className='container'>
                <h3>Subject</h3>
                <div className='wrapper'>
                    <AddSubject toggle={this.addClicked} delete={this.delete}/>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId='root' >
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {(this.props.subjects || []).map((item, idx)=>(
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
                                    <ListSubject subject={item.title} edit={this.edit} click={this.clicked} index={idx} />
                                </div>
                                {provided.placeholder}
                                </div>
                            )}
                            </Draggable>
                            )
                            )}
                            
                            {this.state.addClicked&&(
                                <div><input className='inputFld' type='text' placeholder='Subject name' onKeyPress={this.submit}/></div>
                            )}
                            {provided.placeholder}
                        </div>}
        </Droppable>
        
      </DragDropContext>
      </div>
          </div>
    )
  }
}