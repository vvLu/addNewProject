import Vue from 'vue'

export const renderHtml = ({dispatch},e)=>{
    var _renderHtml = marked(e.target.value) 
    return dispatch('MARKDOWN_SUCCESS',e.target.value,_renderHtml)
}