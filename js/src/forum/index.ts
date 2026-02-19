import app from 'flarum/forum/app';
import addIgnoreUserControlButton from './addIgnoreUserControlButton';
import addHideIgnoredPost from './addHideIgnoredPost';
import addProfilePage from './addProfilePage';
import addIgnoredUserBadge from './addIgnoredUserBadge';
import addSettingsPage from './addSettingsPage';
import addHideIgnoredDiscussion from './addHideIgnoredDiscussion';

export { default as extend } from './extend';

app.initializers.add('fof-ignore-users', function () {
  addIgnoreUserControlButton();
  addHideIgnoredPost();
  addHideIgnoredDiscussion();
  addProfilePage();
  addIgnoredUserBadge();
  addSettingsPage();
});
