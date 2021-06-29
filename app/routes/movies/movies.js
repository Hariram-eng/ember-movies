import Route from '@ember/routing/route';

export default class MoviesMoviesRoute extends Route {


    async model(params){
        console.log('hi'); 
        let g=(await this.store.findRecord('fav-movie',params.id))
        console.log(g)
        return g;
    }
}
