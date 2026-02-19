import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import IndexPage from 'flarum/forum/components/IndexPage';

export default function () {
  extend(DiscussionListItem.prototype, 'view', function (vdom) {
    if (!vdom || !vdom.attrs || !this.attrs.discussion) return;

    if (!(app.current.matches(IndexPage) || app.current.get('routeName') === 'index')) return;

    const user = this.attrs.discussion.user();
    if (!user || !user.ignored()) return;

    const preference =
      app.session.user?.preferences?.()?.['fof-ignore-users.ignored_discussion_behavior'] ||
      app.forum.attribute('fof-ignore-users.ignored_discussion_default_behavior') ||
      'hide';

    if (preference === 'hide') {
      if (!vdom.attrs.style) vdom.attrs.style = {};
      vdom.attrs.style.display = 'none';
    }
  });
}
