import React from 'react';
import axios from 'axios';
import CustomForm from "../components/forms";
import { Card,button } from 'antd';



class ArticleDetail extends React.Component{

      state = {
          article: {}
      }  


      
    componentDidMount()  {
        
        const ArticleID = this.props.match.params.ArticleID;
        axios.get(`http://127.0.0.1:8000/api/${ArticleID}`)
            .then(res => {
                this.setState({
                    article : res.data
                });
            })

    }

    handleDelete = (event) =>{
        const ArticleID = this.props.match.params.ArticleID;
        axios.delete(`http://127.0.0.1:8000/api/${ArticleID}`);
        this.props.history.push('/');
        this.forceUpdate();


    }
 

    render(){
        return(
            <div>
            <Card title = {this.state.article.title}>
             <p> {this.state.article.content}</p> 
            </Card>
            <CustomForm 
             requestType ="put"
             ArticleID= {this.props.match.params.ArticleID}
             btnText= "Update"/>
              <form onSubmit={this.handleDelete}>
                  <button type='danger' htmltype ='submit'>Delete</button>
              </form>
            </div>
           
            
        )
    }
    

} 

export default ArticleDetail;