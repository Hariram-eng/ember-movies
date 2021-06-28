import Model,{attr} from '@ember-data/model';

export default class FavMovieModel extends Model {
    @attr('string') title;
    @attr('string') Language;
    @attr('string') date;
    @attr('string') Image;
    @attr('string') vote;
    @attr('string') overview;
    @attr('string') review;

}
