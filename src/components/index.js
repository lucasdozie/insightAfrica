import React, { Component } from 'react';
import Subject from "./Subject"
import Section from "./Section"
import Topic from "./Topic"


export default class App extends Component {
    state = {
        subjects: [
            {title:'Mathematics', section:['3FT7VU', '2FB78H']},
            {title: 'Biology', section: ['2VU678']},
            {title:'Physics', section: ['C580BN']}
        ],
        sections: [
            {'section':'Numbers and Numeration', code: '3FT7VU', topic: ['2RT78W', '2FB78HQ']},
            {'section':'Algebra', code: '2FB78H', topic: ['2FB78HS', '2RT78ZS', '2FF78HS']},
            {'section':'Anatomy', code: '2VU678', topic: ['2RT78G']},
            {'section':'Mechanics', code: 'C580BN', topic: ['2RTS8W']},
        ],
        topics: [
            {'topic':'Numbers and Systems', code: '2RT78W'},
            {'topic':'Ratio', code: '2FB78HQ'},
            {'topic':'GP', code: '2RT78ZS'},
            {'topic':'AP', code: '2FB78HS'},
            {'topic':'Inequalities', code: '2FF78HS'},
        ],
        selectedSection: [],
        selectedTopic: [],
        currentTopic: 0,
        currSubject: 0
    }

    componentDidMount(){
        this.getSection();
        this.getTopic();
    }

    getSection = (i) => {
        let index = i || 0
        let sbjsecArray = this.state.subjects[index].section
        let sec = this.state.sections.filter((item, idx)=> sbjsecArray.indexOf(item.code) !== -1)
        

         this.setState({selectedSection: sec, currSubject: index})
    }

    getTopic = (x) => {
        let index = x || 0
        console.log("Output: "+this.state.sections[index].topic);
        let topicArr = this.state.sections[index].topic
        let topicData = this.state.topics.filter((item, idx)=> topicArr.indexOf(item.code) !== -1)
        
        this.setState({currentTopic: index, selectedTopic: topicData});
    }

    topicdropUpdate = (topics) => {
        this.setState({
            topics
          });
    }

    sectiondropUpdate = (sections) => {
        this.setState({
            sections
          });
    }

    sectionSubmit = (name, code) => {
        let codeExist = this.state.sections.find(item=>item.code===code)
        if(codeExist){
            alert('Code must be unique!')
            return
        }
        let newSection = {section: name, code: code.toUpperCase()}
        let newSelectedSection = [...this.state.selectedSection, newSection]
        let newSubject = this.state.subjects.map((item, i)=>{
            if(i === this.state.currSubject){
                item.section = [...item.section, newSection.code]
            }
            return item
        })
        this.setState({
            sections: [...this.state.sections, newSection],
            subjects: newSubject,
            selectedSection: newSelectedSection
        })
    }

    sectionEdit = (val, newVal) => {
        let sections = this.state.sections.map((item, i)=>{
            if(item.code === val.code){
                item.section = newVal
            }
            return item
        })
        this.setState({sections})
    }

    sectionDelete = (section) => {
        let {sections, subjects, selectedSection} = this.state
        let sbjIdx = sections.findIndex(item=>item.code === section.code)
        let newSection = sections.filter(item=>item.code !== section.code)
        let newSelectedSection = selectedSection.filter(item=>item.code !== section.code)
        let newSubject = subjects.map((item, i)=>{
            if(item.section.indexOf(sbjIdx) !== -1){
                item.section = item.section.filter(v=>v!==sbjIdx)
            }
            return item
        })

        this.setState({
            sections: newSection,
            subjects: newSubject,
            selectedSection: newSelectedSection
        })
    }

    subjectdropUpdate = (subjects) => {
        this.setState({
            subjects
          });
    }

    subjectSubmit = (val) => {
        let newSub = {title: val, section: []}
        this.setState({subjects: [...this.state.subjects, newSub]}) 
    }

    subjectEdit = (subjects) => {
        this.setState({subjects})
    }

    subjectDelete = (subjects) => {
        this.setState({subjects})
    }


    render() {
        return (
            <div>
                <Subject subjects={this.state.subjects} click={this.getSection} dropUpdate={this.subjectdropUpdate} edit={this.subjectEdit} delete={this.subjectDelete} submit={this.subjectSubmit}/>
                <Section sections={this.state.selectedSection} click={this.getTopic} dropUpdate={this.sectiondropUpdate} edit={this.sectionEdit} delete={this.sectionDelete} submit={this.sectionSubmit}/>
                <Topic topics={this.state.selectedTopic} click={this.getTopic} dropUpdate={this.topicdropUpdate}/>
            </div>
            
        )
    }
}