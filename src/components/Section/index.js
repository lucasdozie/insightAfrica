import React, { Component } from 'react'
import AddSubject from './add'
import ListSection from './list'
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


export default class Section extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            addClicked: false,
            index: null,
            dragData: []
        }
    }

    componentDidMount(){
        this.timerID = setInterval(
                () => this.tick(),
                1000
            );
    }

    tick= () => {
        this.setState({
            date: new Date()
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({dragData: nextProps.sections})
       
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

    clicked = (i) => {
        console.log("index: "+ i);
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

    addSection = ()=>{
        let name = this.inputName.value;let code = this.inputCode.value;
        if(name==='' || code===''){
            alert('fill all fields')
        }else{
            this.props.submit(name, code)
            this.setState({addClicked: false}) 
        }
    }

    edit = (subj, i) => {
        let section = this.state.dragData[i]
        this.props.edit(section, subj)
    }

    delete = () => {
        var toDelete = window.confirm('Are you sure you want to delete');
        if(toDelete){
            let section = this.state.dragData[this.state.index]
            this.props.delete(section)
            this.setState({index: null})
        }  
    }



    render(){
    return (
        <div className='container'>
                <h3>Section - Time is {this.state.date.toLocaleTimeString()}.</h3>
                <div className='wrapper'>
                    <AddSubject toggle={this.addClicked} delete={this.delete}/>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId='root' >
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {this.state.dragData.map((item, idx)=>(
                            <Draggable key={idx} draggableId={idx} index={idx}>
                            {(provided, snapshot) => (
                                <div class={idx}>
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
                                        <span>{idx+1}. </span><ListSection section={item.section} edit={this.edit} click={this.clicked} index={idx} />
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
      </div>
      {this.state.addClicked&&(
                                <div>
                                    <input className='inputFld' ref={name=>this.inputName = name} type='text' placeholder='Subject name' />
                                    <input type='text' ref={code=>this.inputCode=code} placeholder='enter code' />
                                    <button onClick={this.addSection}>save</button>
                                </div>
                            )}
          </div>
    )
  }
}