import Controller from '@ember/controller';
import fetch from 'fetch';
import { action , computed } from "@ember/object";
import {inject as service } from '@ember/service';

export default class MoviesController extends Controller {
    @service
    store

    randomMoviesArray=[];    


    @computed
     get getRandomMovies(){  
        var imgSrc='https://image.tmdb.org/t/p/w500';
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=1cf50e6248dc270629e802686245c2c8&vote_average.gte=6"
         ,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'no-cors'
        }
        ).then(res =>(res.json())).then((data)=>{
            let count=0;
           [...data.results].forEach((i)=>{
            let imageUrl=imgSrc+i.poster_path
               if(i.poster_path == null){
                   imageUrl='/assests/Images/pic.png';
               }               
                let object={
                    title:i.title,
                    Image:imageUrl,
                    Language:i.original_language,
                    date:i.release_date,    
                    vote:i.vote_average,
                    overview:i.overview,
                    index:count,
                }
              this.randomMoviesArray.pushObject(object);   
              count+=1;          
            })
	    })
    }


    displayStoreMovies=(e)=>{
        let index=e.path[0].children[5].value;
        let parent=document.getElementsByClassName('details')[0];
        parent.style.display='block';
        document.getElementsByClassName('storedetails')[0].style.display='none';
        document.getElementsByClassName("expandimage")[0].src=this.randomMoviesArray[index].Image;
        parent.children[2].value="";
        parent.children[2].focus();
        parent.children[1].innerText='Title - '+this.randomMoviesArray[index].title;
        parent.children[3].innerText=this.randomMoviesArray[index].overview ;
        parent.children[5].value=index;  
        document.getElementsByClassName('submitbutton')[0].style.display='block';  
    }


    saveRecord=(e)=>{        
        let value=e.path[1].children[2].value.trim();        
        if(value != ""){
            let index=e.path[1].children[5].value;
            let object=this.randomMoviesArray[index];
            object.review=value;
            this.store.createRecord('fav-movie',object).save().then(function(){
                document.getElementsByClassName('storedetails')[0].style.display='block';
                document.getElementsByClassName('details')[0].style.display='none'; 
            });
        }
        else{
            alert('Please give a review about this movie in input box');
        }
        
    }

    deleteStoreRecord=(e)=>{
        e.stopPropagation();
        this.store.findRecord('fav-movie',e.target.value).then((data)=>{
            data.destroyRecord();
        })
    }

    myFavorites(){
        document.getElementsByClassName('storedetails')[0].style.display='block';
        document.getElementsByClassName('details')[0].style.display='none';        
    }


    @computed
    get getFavaoritesMovies(){
        document.getElementsByClassName('storedetails')[0].style.display='block';
        document.getElementsByClassName('details')[0].style.display='none';  
        return this.store.findAll('fav-movie');

    }

    @action
    async storeMovieDetails(e){       
        let storedata=await this.store.findRecord('fav-movie',e.path[0].children[3].value);
        let parent=document.getElementsByClassName('details')[0];
        parent.style.display='block';
        document.getElementsByClassName('storedetails')[0].style.display='none';
        document.getElementsByClassName("expandimage")[0].src=storedata.Image;
        parent.children[2].value=storedata.review;
        parent.children[1].innerText='Title - '+storedata.title;
        parent.children[3].innerText=storedata.overview ;
        document.getElementsByClassName('submitbutton')[0].style.display='none';
    }
}
