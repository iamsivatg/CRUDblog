import React from 'react';
import Articles from '../components/Article';
import CustomForm from '../components/forms';
import axios from 'axios';



class ArticleList extends React.Component{

      state = {
          articles: []
      }  




    componentDidMount()  {
        axios.get(`http://127.0.0.1:8000/api/`)
            .then(res => {
                this.setState({
                    articles : res.data
                });
               
            })

    }
 

    render(){

        return(
            <div>
            <Articles data ={this.state.articles} />
            <h2>Create An Article</h2>
            <CustomForm 
                requestType ="post"
                ArticleID= {null}
                btnText="Create"/>
            </div>
        )

    }

} 

export default ArticleList;