import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import Select from 'flarum/common/components/Select';

export default function () {
  extend(SettingsPage.prototype, 'privacyItems', function (items) {
    const preferences = this.user.preferences();

    const behaviorOptions = {
      label: app.translator.trans('fof-ignore-users.forum.settings.default_behavior_options.label'),
      hide: app.translator.trans('fof-ignore-users.forum.settings.default_behavior_options.hide'),
    };

    items.add(
      'ignored-discussion-behavior',
      <div className="Form-group">
        <label>{app.translator.trans('fof-ignore-users.forum.settings.ignored_discussion_default_behavior_label')}</label>
        <Select
          value={
            preferences['fof-ignore-users.ignored_discussion_behavior'] ||
            app.forum.attribute('fof-ignore-users.ignored_discussion_default_behavior') ||
            'hide'
          }
          options={behaviorOptions}
          onchange={(value) => {
            this.ignoredDiscussionBehaviorLoading = true;
            this.user.savePreferences({ 'fof-ignore-users.ignored_discussion_behavior': value }).then(() => {
              this.ignoredDiscussionBehaviorLoading = false;
              m.redraw();
            });
          }}
          loading={this.ignoredDiscussionBehaviorLoading}
        />
        <p className="helpText">{app.translator.trans('fof-ignore-users.forum.settings.ignored_discussion_behavior_help')}</p>
      </div>
    );

    items.add(
      'ignored-post-behavior',
      <div className="Form-group">
        <label>{app.translator.trans('fof-ignore-users.forum.settings.ignored_post_default_behavior_label')}</label>
        <Select
          value={
            preferences['fof-ignore-users.ignored_post_behavior'] || app.forum.attribute('fof-ignore-users.ignored_post_default_behavior') || 'hide'
          }
          options={behaviorOptions}
          onchange={(value) => {
            this.ignoredPostBehaviorLoading = true;
            this.user.savePreferences({ 'fof-ignore-users.ignored_post_behavior': value }).then(() => {
              this.ignoredPostBehaviorLoading = false;
              m.redraw();
            });
          }}
          loading={this.ignoredPostBehaviorLoading}
        />
        <p className="helpText">{app.translator.trans('fof-ignore-users.forum.settings.ignored_post_behavior_help')}</p>
      </div>
    );
  });
}
