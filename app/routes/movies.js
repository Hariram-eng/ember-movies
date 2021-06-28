import Route from '@ember/routing/route';

export default class MoviesRoute extends Route {
    a={

    }
    beforeModel(){
        this.a={
            b:[20,30,40,50]
        }
    }

    setupController(controller){
        controller.set("objectArray", this.a);
    }


    model(params){
        return params;
    }
}
