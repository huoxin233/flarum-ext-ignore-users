import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/forum/components/CommentPost';
import Button from 'flarum/common/components/Button';

export default function () {
  extend(CommentPost.prototype, 'elementAttrs', function (elementAttrs) {
    const user = this.attrs.post.user();
    const ignored = user && user.ignored();
    if (!ignored) return;

    const preference =
      app.session.user?.preferences?.()?.['fof-ignore-users.ignored_post_behavior'] ||
      app.forum.attribute('fof-ignore-users.ignored_post_default_behavior') ||
      'hide';

    if (preference === 'hide') {
      elementAttrs.className += ' Post--hidden';
    }

    return elementAttrs;
  });

  extend(CommentPost.prototype, 'headerItems', function (items) {
    const post = this.attrs.post;

    if (post.isHidden() || !(post.user() && post.user().ignored())) {
      return;
    }

    const preference =
      app.session.user?.preferences?.()?.['fof-ignore-users.ignored_post_behavior'] ||
      app.forum.attribute('fof-ignore-users.ignored_post_default_behavior') ||
      'hide';

    if (preference === 'hide') {
      items.add(
        'ignore-toggle',
        Button.component({
          className: 'Button Button--default Button--more',
          icon: 'fas fa-ellipsis-h',
          onclick: this.toggleContent.bind(this),
        })
      );
    }
  });
}
