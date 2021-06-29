import React, { Component } from 'react';
import _ from 'lodash';

import SearchBar from './components/SearchBar';
import YTSearch from 'youtube-api-search'; 
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

import styles from './styles/style.css';
const API_KEY = 'AIzaSyCazvzWGihtmyg5_2usra_y7SEgusLZ3zI'; // Youtube API key

class App extends Component {

    constructor(props){
        super (props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Gary Vaynerchuk');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos, 
                selectedVideo: videos[0]
            });
        });
    }

    render () {
        const videoSearch = _.debounce((term)=> {this.videoSearch(term)}, 300);
        
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                    <VideoDetail video = {this.state.selectedVideo}/>
                
                <VideoList 
                onVideoSelect = { selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos}
                />

            </div>
        );
    }
}

export default App;