import React, { Component } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";

export default class Utente extends 
Component {
    render (){
        return(
        <Query query={gql`
        {
  
            me  {
                display_name    
               country
              href
              email
              uri
             albums {
               added_at
             }
              images {
                height
                url
                width
              }
              top_tracks {
                id
                album{
                    name
                    artists 
                {
                 name
                    }
                }
              }top_artists {
                name
              }
            
                   
              }
            }
        `}>
            {({loading, error, data}) => (
                <div>
                    {loading &&
                    <p>caricamento...</p>}
                    {!loading && 
                    <div>
                        {/*JSON.stringify(data, null, 2)*/}
                        <img className="imguser" src={data.me.images[0].url} width="100" height="100"></img>
                        <div>nome utente: {data.me.display_name}</div>
                        <div>link: {data.me.href}</div>
                        <div>email :{data.me.email}</div>
                        <div> {data.me.top_tracks.map((item)=>
                            <div>{item.album.artists[0].name}</div>)}</div>
                        {/*<div>top tracs : {data.me.top_tracks[0].album.name}</div>*/}
                        <div> {data.me.top_artists.map((item)=>
                            <div>{item.name}</div>)}</div>
                        {/*<div>top artist : {data.me.top_artists[0].name}</div>*/}
                        
                        
                        
                        
                    </div>}
                </div>
            )}
        </Query>)
    }
}
