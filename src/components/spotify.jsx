import React, { Component } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import { Collapse, Button, Table, } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

const humanizeDuration = require('humanize-duration')
humanizeDuration(12000) // '12 seconds'

const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        m: () => '',
        s: () => '',
      }
    },
    round: true,
    conjunction:':'
  })
  
  shortEnglishHumanizer(15600000)

export default class Utente extends 
Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    render (){
        return(
        <Query query={gql`
        {
  
            me  {
                display_name    
               
              href
              email
              
             albums {
               added_at
             }
              images {
                height
                url
                width
              }
              top_tracks {
                name
                track_number
                duration_ms
                artists{
                  name
                }
                album{
                  name
                }
                preview_url
              }
              top_artists {
    
                name
                genres
                albums{
                  name
                  tracks{
                    track_number
                    duration_ms
                    preview_url
                  }
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
                        {/*<img className="imguser" src={data.me.images[0].url} width="100" height="100"></img>*/}
                        <div>nome utente: {data.me.display_name}</div>
                        <div>link: {data.me.href}</div>
                        <div>email :{data.me.email}</div>

                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Top Tracks</Button>
                    <Collapse isOpen={this.state.collapse}>
                    <div className="top_tracks">

                            <Table dark>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Duration</th>
                                  <th>Name</th>
                                  <th>Artist</th>
                                  <th>Album</th>
                                  <th>Play</th>
                                </tr>
                              </thead>
                              <tbody>

                                {data.me.top_tracks.map((item, idx) =>
                                  <tr>
                                    <td scope="row"><div>{idx + 1}</div></td>

                                    <td> <div>{shortEnglishHumanizer(item.duration_ms)}</div></td>
                                    <td><div>{item.name}</div></td>
                                    <td><div>{item.artists[0].name}</div></td>
                                    <td><div>{item.album.name}</div></td>
                                    <td><div><a href={item.preview_url}><FontAwesomeIcon icon="play" /><i class="fas fa-play"></i></a></div></td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                    </Collapse>
                    <Collapse isOpen={this.state.collapse}>
                    <div className="top_artists">

                            <Table dark>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Duration</th>
                                  <th>Name</th>
                                  <th>Artist</th>
                                  <th>Album</th>
                                  <th>Play</th>
                                </tr>
                              </thead>
                              <tbody>

                                {data.me.top_artists.map((item, idx) =>
                                  <tr>
                                    <td scope="row"><div>{idx + 1}</div></td>

                                    <td> <div>{shortEnglishHumanizer(item.duration_ms)}</div></td>
                                    <td><div>{item.name}</div></td>
                                    <td><div>{item.artists[0].name}</div></td>
                                    <td><div>{item.album.name}</div></td>
                                    <td><div><a href={item.preview_url}><FontAwesomeIcon icon="play" /><i class="fas fa-play"></i></a></div></td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                    </Collapse>
                    
                        
                        {/*<div>top tracs : {data.me.top_tracks[0].album.name}</div>*/}
                        
                        <div> {data.me.top_artists.map((item)=>
                            <div>{item.name}</div>)}
                        </div>
                        {/*<div>top artist : {data.me.top_artists[0].name}</div>*/}
                        
                        
                        
                        
                    </div>}
                </div>
            )}
        </Query>)
    }
}
