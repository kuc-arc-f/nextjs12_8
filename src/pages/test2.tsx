import React, {Component} from 'react';
import { gql } from "@apollo/client";
import client from '../apollo-client'
import Layout from '../components/layout'

interface IProps {
  history:string[],
  tasks: any[],
}
interface IObject {
  id: number,
  title: string
}
//
function Page(props:IProps) {
//console.log(props.tasks);
  const clickHandler = async function(){
    try{
      console.log("#clickHandler");
      const title = document.querySelector<HTMLInputElement>('#title');
      console.log(title.value);
      const result = await client.mutate({
        mutation:gql`
        mutation {
          addTask(title: "${title.value}"){
            id
          }
        }            
      `
      });
  console.log(result);      
    } catch (e) {
      console.error(e);
      alert('Error , add task');
    }
  }
  return (
  <Layout>
    <div className="container py-4">
      <h3>Test2 - index</h3>
      <hr />
      Add<br />
      <input type="text" name="title" id="title" />
        <button onClick={() => clickHandler()}>
          Add
        </button>       
      <hr />
      {
      props.tasks.map((item: IObject, index: number) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <hr className="my-1"/>
        </div>
      ))        
      }
    </div>
  </Layout>
  );
}
export const getServerSideProps = async (ctx) => {
  const data = await client.query({
    query: gql`
    query {
      tasks {
        id
        title
      }
    }
    ` 
    ,fetchPolicy: "network-only"
  }) 
//console.log(data.data.tasks) 
  return {
    props: { tasks: data.data.tasks },
  }
}

export default Page;

