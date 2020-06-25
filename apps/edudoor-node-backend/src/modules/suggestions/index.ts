import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import SearchSuggestionsController from './SearchSuggestionsController';

const Router = new MRouter('/suggestions', Authorization.authenticate);

Router.get('/:type', SearchSuggestionsController.getSuggestions);

export default Router;
